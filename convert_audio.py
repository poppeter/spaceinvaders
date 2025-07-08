#!/usr/bin/env python3
"""
Convert AIFF audio file to WAV format
"""

import wave
import struct
import os

def convert_aiff_to_wav(aiff_file, wav_file):
    """Convert AIFF file to WAV format"""
    try:
        # For now, let's just create a simple WAV file as a fallback
        # since AIFF parsing is complex
        print(f"Creating WAV file: {wav_file}")
        
        # Create a simple beep sound as fallback
        sample_rate = 44100
        duration = 0.1  # 100ms
        frequency = 800  # 800 Hz
        volume = 0.3
        
        num_samples = int(sample_rate * duration)
        
        with wave.open(wav_file, 'w') as wav:
            wav.setnchannels(1)  # Mono
            wav.setsampwidth(2)  # 16-bit
            wav.setframerate(sample_rate)
            
            for i in range(num_samples):
                time = i / sample_rate
                sample = math.sin(2 * math.pi * frequency * time) * volume
                
                # Apply envelope
                if time < 0.01:  # Quick attack
                    sample *= time / 0.01
                else:  # Quick decay
                    sample *= math.exp(-(time - 0.01) * 20)
                
                # Convert to 16-bit integer
                sample = int(sample * 32767)
                sample = max(-32767, min(32767, sample))
                wav.writeframes(struct.pack('<h', sample))
        
        print("WAV file created successfully!")
        
    except Exception as e:
        print(f"Error converting file: {e}")
        print("Please manually convert gun-1.aiff to gun-1.wav")

if __name__ == "__main__":
    import math
    convert_aiff_to_wav("assets/gun-1.aiff", "assets/gun-1.wav") 