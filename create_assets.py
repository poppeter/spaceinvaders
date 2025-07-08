#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw
import wave
import struct
import math
import random


def create_directory():
    os.makedirs('assets', exist_ok=True)


def create_player_sprite():
    # Create player ship (64x32)
    img = Image.new('RGBA', (64, 32), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Ship body (blue)
    draw.polygon([(32, 4), (20, 28), (44, 28)], fill=(0, 150, 255))
    # Ship details (white)
    draw.rectangle([28, 8, 36, 12], fill=(255, 255, 255))
    draw.rectangle([30, 16, 34, 20], fill=(255, 255, 255))
    
    img.save('assets/player.png')


def create_alien_sprite():
    # Create alien invader (48x32)
    img = Image.new('RGBA', (48, 32), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Alien body (green)
    draw.ellipse([8, 8, 40, 24], fill=(0, 255, 0))
    # Alien eyes (white)
    draw.ellipse([16, 12, 20, 16], fill=(255, 255, 255))
    draw.ellipse([28, 12, 32, 16], fill=(255, 255, 255))
    # Alien details (black)
    draw.ellipse([18, 14, 18, 14], fill=(0, 0, 0))
    draw.ellipse([30, 14, 30, 14], fill=(0, 0, 0))
    
    img.save('assets/alien.png')


def create_bullet_sprite():
    # Create bullet (8x24)
    img = Image.new('RGBA', (8, 24), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Bullet (yellow)
    draw.rectangle([2, 0, 6, 24], fill=(255, 255, 0))
    
    img.save('assets/bullet.png')


def create_barrier_sprite():
    # Create barrier block (48x32)
    img = Image.new('RGBA', (48, 32), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Barrier (gray)
    draw.rectangle([0, 0, 48, 32], fill=(128, 128, 128))
    # Barrier details (darker gray)
    draw.rectangle([4, 4, 44, 28], fill=(64, 64, 64))
    draw.rectangle([8, 8, 40, 24], fill=(96, 96, 96))
    
    img.save('assets/barrier.png')


def create_background():
    # Create background (960x720)
    img = Image.new('RGBA', (960, 720), (34, 43, 58))
    draw = ImageDraw.Draw(img)
    
    # Add some stars
    for i in range(100):
        x = (i * 37) % 960
        y = (i * 73) % 720
        size = (i % 3) + 1
        draw.ellipse([x, y, x + size, y + size], fill=(255, 255, 255))
    
    img.save('assets/background.png')


def create_wav_file(filename, frequency=440, duration=0.5, volume=0.3):
    """Create a simple WAV file with a sine wave"""
    sample_rate = 44100
    num_samples = int(sample_rate * duration)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            # Generate sine wave
            sample = math.sin(2 * math.pi * frequency * i / sample_rate)
            # Convert to 16-bit integer
            sample = int(sample * volume * 32767)
            # Write as little-endian 16-bit
            wav_file.writeframes(struct.pack('<h', sample))


def create_bgm_file(filename, duration=10.0, volume=0.15):
    """Create a more sophisticated background music with space theme"""
    sample_rate = 44100
    num_samples = int(sample_rate * duration)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            time = i / sample_rate
            
            # Create a space-themed ambient sound with multiple layers
            # Base drone (low frequency)
            base_freq = 110  # A2
            base_sample = math.sin(2 * math.pi * base_freq * time) * 0.3
            
            # Harmonic layer (mid frequency)
            mid_freq = 220  # A3
            mid_sample = math.sin(2 * math.pi * mid_freq * time) * 0.2
            
            # High frequency layer (spacey)
            high_freq = 440  # A4
            high_sample = math.sin(2 * math.pi * high_freq * time) * 0.1
            
            # Add some variation over time
            variation = math.sin(2 * math.pi * 0.1 * time) * 0.1
            
            # Combine all layers
            sample = base_sample + mid_sample + high_sample + variation
            
            # Apply envelope to avoid clicks
            envelope = 1.0
            if time < 0.1:  # Fade in
                envelope = time / 0.1
            elif time > duration - 0.1:  # Fade out
                envelope = (duration - time) / 0.1
            
            sample *= envelope * volume
            
            # Convert to 16-bit integer
            sample = int(sample * 32767)
            # Clamp to valid range
            sample = max(-32767, min(32767, sample))
            # Write as little-endian 16-bit
            wav_file.writeframes(struct.pack('<h', sample))


def create_explosion_sound(filename, duration=0.8, volume=0.4):
    """Create a realistic explosion sound with multiple layers"""
    sample_rate = 44100
    num_samples = int(sample_rate * duration)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            time = i / sample_rate
            
            # Multiple explosion layers for more realistic sound
            # Low frequency boom (explosion base) - more complex
            boom_freq = (60 + (time * 40) +
                        (math.sin(time * 10) * 5))  # Frequency sweep
            boom_sample = math.sin(2 * math.pi * boom_freq * time) * 0.3
            
            # Add harmonics to the boom
            boom_harmonic = math.sin(2 * math.pi * boom_freq * 2 * time) * 0.15
            boom_harmonic2 = math.sin(2 * math.pi * boom_freq * 3 * time) * 0.1
            
            # Mid frequency crackle - more varied
            crackle_freq = (150 + (time * 200) +
                           (math.sin(time * 15) * 20))
            crackle_sample = math.sin(2 * math.pi * crackle_freq * time) * 0.25
            
            # High frequency sizzle - more complex
            sizzle_freq = (600 + (time * 800) +
                          (math.sin(time * 20) * 50))
            sizzle_sample = math.sin(2 * math.pi * sizzle_freq * time) * 0.2
            
            # Add more complex noise layers for realism
            noise_low = (random.random() - 0.5) * 0.15
            noise_mid = (random.random() - 0.5) * 0.1
            noise_high = (random.random() - 0.5) * 0.05
            
            # Add some metallic ringing (debris)
            debris_freq = 800 + (time * 1200)
            debris_sample = math.sin(2 * math.pi * debris_freq * time) * 0.1
            
            # Combine all layers
            sample = (boom_sample + boom_harmonic + boom_harmonic2 +
                     crackle_sample + sizzle_sample + debris_sample +
                     noise_low + noise_mid + noise_high)
            
            # Apply more realistic explosion envelope
            envelope = 1.0
            if time < 0.02:  # Very quick attack
                envelope = time / 0.02
            elif time < 0.1:  # Short sustain
                envelope = 1.0
            else:  # Complex decay with multiple stages
                decay_time = time - 0.1
                envelope = math.exp(-decay_time * 6) * (1 - decay_time * 2)
                envelope = max(0, envelope)  # Ensure it doesn't go negative
            
            # Add some variation to the envelope
            envelope *= (1 + math.sin(time * 30) * 0.1)
            
            sample *= envelope * volume
            
            # Convert to 16-bit integer
            sample = int(sample * 32767)
            # Clamp to valid range
            sample = max(-32767, min(32767, sample))
            # Write as little-endian 16-bit
            wav_file.writeframes(struct.pack('<h', sample))


def create_player_explosion_sound(filename, duration=1.0, volume=0.5):
    """Create a dramatic player explosion sound"""
    sample_rate = 44100
    num_samples = int(sample_rate * duration)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            time = i / sample_rate
            
            # Multiple explosion layers for player
            # Deep bass boom (player explosion is more dramatic)
            boom_freq = 60 + (time * 30)  # Lower frequency sweep
            boom_sample = math.sin(2 * math.pi * boom_freq * time) * 0.5
            
            # Mid frequency explosion
            mid_freq = 150 + (time * 200)
            mid_sample = math.sin(2 * math.pi * mid_freq * time) * 0.4
            
            # High frequency debris
            high_freq = 600 + (time * 600)
            high_sample = math.sin(2 * math.pi * high_freq * time) * 0.3
            
            # More noise for dramatic effect
            noise = (random.random() - 0.5) * 0.2
            
            # Combine all layers
            sample = boom_sample + mid_sample + high_sample + noise
            
            # Apply dramatic explosion envelope (slower decay)
            envelope = 1.0
            if time < 0.1:  # Slightly longer attack
                envelope = time / 0.1
            else:  # Slower decay for dramatic effect
                envelope = math.exp(-(time - 0.1) * 4)
            
            sample *= envelope * volume
            
            # Convert to 16-bit integer
            sample = int(sample * 32767)
            # Clamp to valid range
            sample = max(-32767, min(32767, sample))
            # Write as little-endian 16-bit
            wav_file.writeframes(struct.pack('<h', sample))


def create_laser_sound(filename, duration=0.15, volume=0.4):
    """Create a sci-fi laser gun sound"""
    sample_rate = 44100
    num_samples = int(sample_rate * duration)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            time = i / sample_rate
            
            # Laser characteristics
            # High frequency base (laser sound)
            laser_freq = 1200 + (time * 800)  # Frequency sweep
            laser_sample = math.sin(2 * math.pi * laser_freq * time) * 0.4
            
            # Harmonic overtone
            harmonic_freq = 2400 + (time * 1600)
            harmonic_sample = math.sin(2 * math.pi * harmonic_freq * time) * 0.2
            
            # High frequency sizzle
            sizzle_freq = 4000 + (time * 2000)
            sizzle_sample = math.sin(2 * math.pi * sizzle_freq * time) * 0.1
            
            # Add some noise for energy effect
            noise = (random.random() - 0.5) * 0.05
            
            # Combine all layers
            sample = laser_sample + harmonic_sample + sizzle_sample + noise
            
            # Apply laser envelope (very quick attack, quick decay)
            envelope = 1.0
            if time < 0.01:  # Very quick attack
                envelope = time / 0.01
            else:  # Quick decay
                envelope = math.exp(-(time - 0.01) * 20)
            
            sample *= envelope * volume
            
            # Convert to 16-bit integer
            sample = int(sample * 32767)
            # Clamp to valid range
            sample = max(-32767, min(32767, sample))
            # Write as little-endian 16-bit
            wav_file.writeframes(struct.pack('<h', sample))


def create_audio_files():
    # Create different sound effects
    create_laser_sound('assets/shoot.wav', duration=0.15, volume=0.4)
    # create_explosion_sound('assets/explosion.wav', duration=0.8, volume=0.4)  # Use real explosion sound instead
    create_player_explosion_sound('assets/player_explosion.wav',
                                  duration=1.0, volume=0.5)
    create_wav_file('assets/hit.wav', frequency=400,
                    duration=0.2, volume=0.3)
    
    # Create improved background music
    create_bgm_file('assets/bgm.wav', duration=10.0, volume=0.15)


def main():
    print("Creating Space Invaders assets...")
    create_directory()
    create_player_sprite()
    create_alien_sprite()
    create_bullet_sprite()
    create_barrier_sprite()
    create_background()
    create_audio_files()
    print("Assets created successfully in assets/ folder!")


if __name__ == "__main__":
    main() 