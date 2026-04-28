package com.Adey.PawTours.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * CORS Configuration for allowing cross-origin requests from the React frontend
 * to the Spring Boot backend.
 * 
 * Enables requests from localhost:5173 (Vite dev server) and localhost:3000
 */
@Configuration
public class CorsConfig {

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    
    // Explicitly allow only the specified origins (not wildcard)
    config.addAllowedOrigin("http://localhost:5173");
    config.addAllowedOrigin("http://localhost:3000");
    config.addAllowedOrigin("http://127.0.0.1:5173");
    config.addAllowedOrigin("http://127.0.0.1:3000");
    
    // Allow all HTTP methods
    config.addAllowedMethod("*");
    
    // Allow common headers
    config.addAllowedHeader("Content-Type");
    config.addAllowedHeader("Authorization");
    config.addAllowedHeader("Accept");
    config.addAllowedHeader("Origin");
    
    // Cache preflight response for 1 hour
    config.setMaxAge(3600L);
    
    // Don't need credentials for this API
    config.setAllowCredentials(false);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
  }
}
