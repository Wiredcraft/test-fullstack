package utils

import (
	"crypto/sha256"
	"fmt"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/mervick/aes-everywhere/go/aes256"
)

// AESEncrypt aes
func AESEncrypt(text, key string) string {
	return aes256.Encrypt(text, key)
}

// AESDecrypt aes
func AESDecrypt(text, key string) string {
	return aes256.Decrypt(text, key)
}

// JWTSign Json web token
func JWTSign(input *jwt.StandardClaims, signBytes []byte) (string, error) {
	token := jwt.New(jwt.SigningMethodRS256)

	// claimsのセッ
	claims := token.Claims.(jwt.MapClaims)

	claims["sub"] = input.Subject
	if input.IssuedAt > 0 {
		claims["iat"] = input.IssuedAt
	}
	if input.ExpiresAt > 0 {
		claims["exp"] = input.ExpiresAt
	}
	// 電子署名
	signKey, err := jwt.ParseRSAPrivateKeyFromPEM(signBytes)
	if err != nil {
		DebugPrintErr("JWTSign: can not parse rsa from privite key")
		return "", err
	}
	tokenString, err := token.SignedString(signKey)
	if err != nil {
		DebugPrintErr("JWTSign: can not signed string by signkey %s", err)
		return "", err
	}

	return tokenString, nil
}

// JWTVerify
func JWTVerify(tokenString string, verifyBytes []byte) *jwt.StandardClaims {
	claim := &jwt.StandardClaims{}
	verifyKey, err := jwt.ParseRSAPublicKeyFromPEM(verifyBytes)
	if err != nil {
		DebugPrintErr("JWTVerify: can not parse rsa from public key: %s", err)
		return nil
	}
	token, _ := jwt.ParseWithClaims(tokenString, claim, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})
	if token.Valid {
		return claim
	}
	return nil
}

// SHA256Str returns SHA256 has of the string.
func SHA256Str(str string) string {
	return fmt.Sprintf("%x", sha256.Sum256([]byte(str)))
}
