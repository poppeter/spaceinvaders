#!/usr/bin/env python3
"""
Script to download a realistic explosion sound for Space Invaders
"""

import urllib.request
import os

def download_explosion_sound():
    """Download a realistic explosion sound"""
    
    # URL to a free explosion sound (this is an example - you'll need to find a real one)
    # You can find free explosion sounds at: https://freesound.org/search/?q=explosion
    explosion_url = "https://freesound.org/data/previews/448/448618_5121236-lq.mp3"
    
    try:
        print("Downloading explosion sound...")
        urllib.request.urlretrieve(explosion_url, "assets/explosion.wav")
        print("Explosion sound downloaded successfully!")
        print("Note: You may need to convert the file to WAV format")
    except Exception as e:
        print(f"Error downloading: {e}")
        print("\nManual steps to get a good explosion sound:")
        print("1. Go to https://freesound.org/search/?q=explosion")
        print("2. Find a free explosion sound you like")
        print("3. Download it and save as 'assets/explosion.wav'")
        print("4. Make sure it's in WAV format")

if __name__ == "__main__":
    download_explosion_sound() 