package com.IceTea.TowerCrane.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider {
	// JWT 생성 및 검증을 위한 키
	private static final SecretKey SECURITY_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512); // <--- 이 부분 변경

	// JWT 생성하는 메서드
	public String create(String jsId) {
		// 만료날짜를 현재 날짜 + 1시간으로 설정
		Date exprTime = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

		// JWT 생성
		return Jwts.builder()
				// 암호화에 사용될 알고리즘, 키
				.signWith(SECURITY_KEY) // <--- 이 부분 변경
				// JWT 제목, 생성일, 만료일
				.setSubject(jsId).setIssuedAt(new Date()).setExpiration(exprTime)
				// 생성
				.compact();
	}

	// JWT 검증
	public String validate(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()  // <--- 이 부분 변경
                    .setSigningKey(SECURITY_KEY)
                    .build()
                    .parseClaimsJws(token);

            return claimsJws.getBody().getSubject();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid token");
        }
    }
}