package com.Adey.PawTours.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
public class CorsConfig {

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    // Use OriginPattern instead of specific Origins to avoid conflicts
    config.setAllowedOriginPatterns(Arrays.asList("*"));

    // Allow all standard methods
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

    // Allow all headers (Crucial for Axios/Fetch)
    config.setAllowedHeaders(Arrays.asList("*"));

    // Allow credentials if you eventually add JWT/Cookies
    config.setAllowCredentials(true);

    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    // Ensure this matches your API base path
    source.registerCorsConfiguration("/**", config);
    return source;
  }
}