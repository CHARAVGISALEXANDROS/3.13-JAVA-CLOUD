package com.project.authentication;

public class AuthenticationRequest {
    private String username;
    private String password;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public AuthenticationRequest() {
    }

    public AuthenticationRequest(String username, String password) {
        this.username = username;
//        this.password = passwordEncoder.encode(password);
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}