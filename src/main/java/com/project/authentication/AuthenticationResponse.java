package com.project.authentication;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthenticationResponse {

    private final String jwt;
    private String username;
    private Collection<? extends GrantedAuthority> roles;

    public AuthenticationResponse(String jwt, Collection<? extends GrantedAuthority> roles) {
        this.jwt = jwt;
        this.roles = roles;
    }

    public Collection<? extends GrantedAuthority> getRoles() {
        return roles;
    }

    public void setRoles(Collection<? extends GrantedAuthority> roles) {
        this.roles = roles;
    }
//
//    public String getUsername() {
//        return username;
//    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwt() {
        return jwt;
    }
}

