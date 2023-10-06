package ssafy.uniqon.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ssafy.uniqon.global.config.auth.*;
import ssafy.uniqon.model.MemberRole;
import ssafy.uniqon.service.CustomUserDetailsService;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private ApplicationContext context;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Value("${redirect.url}")
    private String redirectUrl;


    // 웹 전체 Security 비활성화
    // @Bean
    // public WebSecurityCustomizer webSecurityCustomizer() {
    // // return (web) -> web.ignoring().requestMatchers("/**", "/**");
    // return (web) -> web.ignoring().requestMatchers("/static/js/**",
    // "/static/image/**", "/static/css/**", "/static/scss/**").anyRequest();
    // }

    // PasswordEncoder는 BCryptPasswordEncoder를 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(jwtAccessDeniedHandler))
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorizeRequests) -> authorizeRequests
                        .requestMatchers("/api/users/**", "/api/auth/**").permitAll()
                        .requestMatchers("/api/**").authenticated()
//                        .requestMatchers("/api/myPage/**").authenticated()
//                        .requestMatchers(HttpMethod.GET, "/api/nfts/**").permitAll()
//                        .requestMatchers("/api/nfts/**").authenticated()
//                        .requestMatchers("/api/notifications/**").authenticated()
//                        .requestMatchers(HttpMethod.GET, "/api/sales/**").permitAll()
//                        .requestMatchers("/api/sales/**").authenticated()
//                        .requestMatchers("/api/wishlist/**").authenticated()
                        .anyRequest().permitAll())
                // .formLogin(formlogin->formlogin.disable())
                .formLogin(formLogin -> formLogin
                        // .loginPage("/api/users/login")
                        // Content-Type을 application/x-www-form-urlencoded
                        .usernameParameter("walletAddress")
                        .passwordParameter("password")
                        .loginProcessingUrl("/api/auth/login")
                        .successHandler(new LoginSuccessHandler(tokenProvider))
                        .failureHandler(new LoginFailuerHandler()))
                .logout(logout -> logout
                        .logoutUrl("/api/users/logout")
                        .deleteCookies("JSESSIONID")
                        .clearAuthentication(true)
                        .logoutSuccessHandler(((request, response, authentication) -> response
                                .sendRedirect(redirectUrl))))
                .addFilterBefore(new JwtFilter(tokenProvider),
                        UsernamePasswordAuthenticationFilter.class)
                .build();

    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider bean = new DaoAuthenticationProvider();
        bean.setHideUserNotFoundExceptions(false);
        bean.setUserDetailsService(customUserDetailsService);
        bean.setPasswordEncoder(passwordEncoder());

        return bean;
    }
}