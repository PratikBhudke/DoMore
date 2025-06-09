package com.domore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.domore.config.WeatherConfig;

@SpringBootApplication
@EnableConfigurationProperties(WeatherConfig.class)
public class DoMoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoMoreApplication.class, args);
	}

}
