package com.phantom.config.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.phantom.service.IAccountService;

@Component
@EnableWebSecurity
public class WebSecutiryConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private IAccountService accountService;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(accountService).passwordEncoder(new BCryptPasswordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.cors()//Cross Origin
        .and()
		.authorizeRequests()
			.antMatchers("/api/v1/accounts/**").hasAnyAuthority("ADMIN", "MANAGER")
			.antMatchers("/api/v1/departments/**").hasAnyAuthority("ADMIN", "MANAGER")
			.anyRequest().authenticated()//Bat ki request nao muon vao duoc cung phai authen
			.and()
			.httpBasic()
			.and()
			.csrf().disable();//Chong tan cong
	}
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
	    configuration.applyPermitDefaultValues();
	    
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
