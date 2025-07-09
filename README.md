# Space Invaders (Phaser 3)

A classic arcade-style Space Invaders game built with Phaser 3, featuring smooth gameplay, progressive difficulty, and polished audio-visual effects.

## 🎮 Game Overview

Experience the timeless thrill of defending Earth from alien invaders! Control your spaceship at the bottom of the screen and eliminate waves of descending aliens before they reach your position. The game features:

- **Smooth Controls**: Responsive ship movement and shooting mechanics
- **Progressive Difficulty**: Each wave becomes more challenging with faster aliens and increased firepower
- **Defensive Barriers**: Strategic barriers that degrade with damage, adding tactical depth
- **Score System**: Track your performance with persistent high scores
- **Lives System**: Multiple attempts to achieve the highest score
- **Audio Experience**: Immersive background music and satisfying sound effects

## 🚀 How to Play

1. **Movement**: Use arrow keys or WASD to move your ship left and right
2. **Shooting**: Press SPACEBAR to fire at the alien invaders
3. **Strategy**: Use the barriers for cover while eliminating aliens
4. **Objective**: Clear all aliens in each wave before they reach the bottom
5. **Survival**: Avoid alien projectiles and manage your limited lives

## 🎯 Game Features

### Core Gameplay
- **Wave-based progression** with increasing difficulty
- **Alien formations** that move in classic Space Invaders patterns
- **Barrier system** that provides tactical cover
- **Lives counter** with visual ship indicators
- **Real-time scoring** with high score persistence

### Visual & Audio
- **Smooth 60 FPS gameplay** optimized for desktop and tablet browsers
- **Particle effects** for explosions and impacts
- **Responsive UI** with clean, modern design
- **Background music** and contextual sound effects
- **Visual feedback** for all game events

### Technical Highlights
- **Modular architecture** for easy extension and modification
- **Asset management** system for easy art/audio replacement
- **Local storage** for persistent high scores
- **Cross-browser compatibility** with modern web standards

## 🎮 Play Now

### Quick Start
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start playing immediately!

### Local Development Server
For the best experience (especially for asset loading), use a local server:

**Using Node.js:**
```bash
npm install -g http-server
http-server .
```
Then open [http://localhost:8080](http://localhost:8080)

**Using Python:**
```bash
python -m http.server
```
Then open [http://localhost:8000](http://localhost:8000)

## 🎨 Customization

The game is designed for easy customization:
- Replace assets in the `assets/` folder with your own art and audio
- Modify game parameters in the scene files for different difficulty curves
- Add new alien types or power-ups by extending the sprite classes
- All code is well-commented and modular for easy modification

## 🏆 High Scores

Your best scores are automatically saved locally and displayed on the game over screen. Challenge yourself to beat your previous records!

---

*Built with Phaser 3 - A powerful HTML5 game framework for creating 2D games* 