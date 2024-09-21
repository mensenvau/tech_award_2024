const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JwtWebToken {
    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY;
        this.accessLimitTime = process.env.JWT_REFRESH_TOKEN_EXP_IN || '30m';
        this.refreshLimitTime = process.env.JWT_REFRESH_TOKEN_EXP_IN || '7d';

        if (!this.secretKey) {
            throw new Error('Secret key not defined in environment variables');
        }

        this.encryptionKey = process.env.JWT_ENCRYPTION_KEY;
        if (!this.encryptionKey) {
            throw new Error('Encryption key not defined in environment variables');
        }

        this.encryptionKeyBuffer = Buffer.from(this.encryptionKey, 'base64');
    }

    encode(data) {
        try {
            const token = jwt.sign(data, this.secretKey, { expiresIn: this.accessLimitTime });
            const encryptedToken = this.encrypt(token);
            return encryptedToken;
        } catch (error) {
            console.error('Error encoding token:', error);
            throw new Error('Failed to encode token');
        }
    }

    verify(encryptedToken) {
        try {
            const decryptedToken = this.decrypt(encryptedToken);
            return jwt.verify(decryptedToken, this.secretKey);
        } catch (error) {
            console.error('Error verifying token:', error);
            throw new Error('Failed to verify token');
        }
    }

    decode(encryptedToken) {
        try {
            const decryptedToken = this.decrypt(encryptedToken);
            return jwt.decode(decryptedToken, { complete: true });
        } catch (error) {
            console.error('Error decoding token:', error);
            throw new Error('Failed to decode token');
        }
    }

    encrypt(token) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', this.encryptionKeyBuffer, iv);
        let encrypted = cipher.update(token, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        const authTag = cipher.getAuthTag().toString('base64');
        return `${iv.toString('base64')}:${authTag}:${encrypted}`;
    }

    decrypt(encryptedToken) {
        const [iv, authTag, encrypted] = encryptedToken.split(':');
        const ivBuffer = Buffer.from(iv, 'base64');
        const authTagBuffer = Buffer.from(authTag, 'base64');
        const encryptedBuffer = Buffer.from(encrypted, 'base64');
        const decipher = crypto.createDecipheriv('aes-256-gcm', this.encryptionKeyBuffer, ivBuffer);
        decipher.setAuthTag(authTagBuffer);
        let decrypted = decipher.update(encryptedBuffer, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    refresh(data){
        try {
            const token = jwt.sign({"username":data.username}, this.secretKey, { expiresIn: this.refreshLimitTime });
            const encryptedToken = this.encrypt(token);
            return encryptedToken;
        } catch (error) {
            console.error('Error encoding token:', error);
            throw new Error('Failed to encode token');
        }
    }
}

module.exports = new JwtWebToken();