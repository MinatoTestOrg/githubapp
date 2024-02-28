package com.minatogithuborg.githubapp.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.vs.rappit.authorization.AuthorizationInterceptor;
import com.vs.rappit.base.cache.ServiceAclCache;

@Configuration
public class WebMVCConfiguration implements WebMvcConfigurer {

	@Autowired
	private ServiceAclCache serviceAclCache; 
	@Value("${anonymous-fe-paths}")
	private List<String> anonymousFEPaths;
	@Value("${anonymous-be-paths}")
	private List<String> anonymousBEPaths;
	
	public void addInterceptors(InterceptorRegistry registry) {
		registry
		.addInterceptor(new AuthorizationInterceptor(serviceAclCache,anonymousFEPaths,anonymousBEPaths))
		.addPathPatterns("/**/rest/**");
	}
}
