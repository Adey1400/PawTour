package com.Adey.PawTours.Service;
import com.Adey.PawTours.DTO.BackpackRequest;
import com.Adey.PawTours.Entity.Accommodation;
import com.Adey.PawTours.Entity.BackpackItem;
import com.Adey.PawTours.Entity.User;
import com.Adey.PawTours.Entity.Vendor;
import com.Adey.PawTours.repository.AccommodationRepository;
import com.Adey.PawTours.repository.BackpackItemRepository;
import com.Adey.PawTours.repository.UserRepository;
import com.Adey.PawTours.repository.VendorRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BackpackService {

    private final BackpackItemRepository backpackItemRepository;
    private final UserRepository userRepository;
    private final AccommodationRepository accommodationRepository;
    private final VendorRepository vendorRepository;

    @Transactional
    public BackpackItem saveToBackpack(BackpackRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BackpackItem backpackItem = BackpackItem.builder()
                .user(user)
                .notes(request.getNotes())
                .build();

        if ("ACCOMMODATION".equalsIgnoreCase(request.getItemType())) {
            // Check for duplicates
            Optional<BackpackItem> existing = backpackItemRepository.findByUserIdAndAccommodationId(user.getId(), request.getItemId());
            if (existing.isPresent()) return existing.get(); // Already saved

            Accommodation acc = accommodationRepository.findById(request.getItemId())
                    .orElseThrow(() -> new IllegalArgumentException("Accommodation not found"));
            backpackItem.setAccommodation(acc);

        } else if ("VENDOR".equalsIgnoreCase(request.getItemType())) {
            // Check for duplicates
            Optional<BackpackItem> existing = backpackItemRepository.findByUserIdAndVendorId(user.getId(), request.getItemId());
            if (existing.isPresent()) return existing.get(); // Already saved

            Vendor vendor = vendorRepository.findById(request.getItemId())
                    .orElseThrow(() -> new IllegalArgumentException("Vendor not found"));
            backpackItem.setVendor(vendor);
        } else {
            throw new IllegalArgumentException("Invalid item type");
        }

        log.info("Saving {} to user {}'s backpack", request.getItemType(), user.getUsername());
        return backpackItemRepository.save(backpackItem);
    }

    public List<BackpackItem> getUserBackpack(Long userId) {
        log.info("Fetching backpack for user {}", userId);
        return backpackItemRepository.findByUserIdOrderBySavedAtDesc(userId);
    }

    @Transactional
    public void removeFromBackpack(Long backpackItemId) {
        log.info("Removing item {} from backpack", backpackItemId);
        backpackItemRepository.deleteById(backpackItemId);
    }
}