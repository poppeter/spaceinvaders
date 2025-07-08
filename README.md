# Space Invaders (Phaser 3)

A full-featured, commercial-quality Space Invaders-style game built with Phaser 3.

## Features
- Modular scenes: Boot, Main Menu, Game, Game Over
- Player ship with movement and shooting
- Alien invaders with wave patterns and projectiles
- Defensive barriers that degrade
- Progressive difficulty
- Lives, score, and high score (localStorage)
- Background music and sound effects
- Polished, responsive UI
- Clean, replaceable placeholder assets

## Project Structure
```
index.html
styles.css
src/
  main.js
  scenes/
    BootScene.js
    MainMenuScene.js
    GameScene.js
    GameOverScene.js
  sprites/
    Player.js
    AlienGroup.js
    BulletManager.js
    BarrierGroup.js
  ui/
    UIManager.js
assets/
  (see assets/README.txt for required files)
```

## Local Testing
To run locally, use a static server (required for Phaser asset loading):

### Using Node.js (http-server)
1. Install: `npm install -g http-server`
2. Run: `http-server .`
3. Open [http://localhost:8080](http://localhost:8080)

### Using Python 3
1. Run: `python -m http.server`
2. Open [http://localhost:8000](http://localhost:8000)

## Asset Replacement
- Replace files in `assets/` with your own art/audio.
- See `assets/README.txt` for required filenames and formats.

## Notes
- Designed for 60 FPS and responsive play on desktop/tablet browsers.
- All code is modular and well-commented for easy extension. 