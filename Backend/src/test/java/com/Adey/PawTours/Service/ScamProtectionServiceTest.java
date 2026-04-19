package com.Adey.PawTours.Service;
import com.Adey.PawTours.DTO.PriceCheckResponse;
import com.Adey.PawTours.Entity.FairPrice;
import com.Adey.PawTours.repository.FairPriceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ScamProtectionServiceTest {

    @Mock
    private FairPriceRepository fairPriceRepository;

    @InjectMocks
    private ScamProtectionService scamProtectionService;

    private FairPrice benchmarkChai;

    @BeforeEach
    void setUp() {
        benchmarkChai = new FairPrice(
                1L, "Kolkata", "food", "Masala Chai",
                new BigDecimal("10.00"),
                new BigDecimal("30.00")
        );
    }

    @Test
    void shouldReturnScamAlert_whenPriceExceedsMaxPrice() {
        when(fairPriceRepository.findByCityAndCategoryAndItemNameIgnoreCase(
                anyString(), anyString(), anyString()))
                .thenReturn(Optional.of(benchmarkChai));

        PriceCheckResponse response =
                scamProtectionService.checkPrice("Kolkata", "food", "Masala Chai", 80.00);

        assertThat(response.isScam()).isTrue();
        assertThat(response.getVerdict()).isEqualTo(PriceCheckResponse.Verdict.SCAM_ALERT);
        assertThat(response.getMessage()).contains("Scam Alert");
    }

    @Test
    void shouldReturnFairPrice_whenPriceIsWithinRange() {
        when(fairPriceRepository.findByCityAndCategoryAndItemNameIgnoreCase(
                anyString(), anyString(), anyString()))
                .thenReturn(Optional.of(benchmarkChai));

        PriceCheckResponse response =
                scamProtectionService.checkPrice("Kolkata", "food", "Masala Chai", 20.00);

        assertThat(response.isScam()).isFalse();
        assertThat(response.getVerdict()).isEqualTo(PriceCheckResponse.Verdict.FAIR_PRICE);
    }

    @Test
    void shouldReturnGreatDeal_whenPriceIsBelowMinPrice() {
        when(fairPriceRepository.findByCityAndCategoryAndItemNameIgnoreCase(
                anyString(), anyString(), anyString()))
                .thenReturn(Optional.of(benchmarkChai));

        PriceCheckResponse response =
                scamProtectionService.checkPrice("Kolkata", "food", "Masala Chai", 5.00);

        assertThat(response.isScam()).isFalse();
        assertThat(response.getVerdict()).isEqualTo(PriceCheckResponse.Verdict.GREAT_DEAL);
    }

    @Test
    void shouldReturnUnknownItem_whenItemNotFoundInDatabase() {
        when(fairPriceRepository.findByCityAndCategoryAndItemNameIgnoreCase(
                anyString(), anyString(), anyString()))
                .thenReturn(Optional.empty());

        PriceCheckResponse response =
                scamProtectionService.checkPrice("Kolkata", "food", "Dragon Roll", 500.00);

        assertThat(response.isScam()).isFalse();
        assertThat(response.isItemFound()).isFalse();
        assertThat(response.getVerdict()).isEqualTo(PriceCheckResponse.Verdict.UNKNOWN_ITEM);
    }
}
