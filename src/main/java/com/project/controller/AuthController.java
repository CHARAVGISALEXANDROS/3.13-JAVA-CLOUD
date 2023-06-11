package com.project.controller;
import com.project.service.JwtUserDetailsService;
import com.project.util.JwtUtil;
import com.project.authentication.AuthenticationRequest;
import com.project.authentication.AuthenticationResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@Api(tags = {"Auth"})
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    UserDetails userDetails;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @PostMapping("/authenticate")
    @ApiOperation(
            value = "Get a valid token in order to access our services",
            notes = "Provide a username and a password in order to grant a token")

    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        final UserDetails userDetails = jwtUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt, userDetails.getAuthorities()));
    }

    @PostMapping("/validateToken")
    @ApiOperation(
            value = "Validate a token",
            notes = "Verify the user token")
    @RequestMapping(value = "/validateToken", method = RequestMethod.POST)
    public Boolean verifyToken(String jwt, @RequestHeader(name = "Authorization") String token) {
        return jwtTokenUtil.validateToken(jwt, userDetails);
    }
}
