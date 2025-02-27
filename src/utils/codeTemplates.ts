/**
 * 默认HTML模板
 */
export const defaultHtmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Weather Cards</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f2f5;
            padding: 20px;
            flex-direction: column;
        }

        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            max-width: 1200px;
        }

        .weather-card {
            width: 250px;
            height: 350px;
            background: linear-gradient(to bottom, #2c3e50, #1a1a2e);
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            color: white;
        }

        .card-header {
            padding: 20px;
            text-align: center;
            position: relative;
            z-index: 2;
        }

        .weather-type {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }

        .temperature {
            font-size: 3rem;
            font-weight: bold;
        }

        .card-content {
            position: relative;
            height: calc(100% - 100px);
            overflow: hidden;
        }

        /* Wind Card Styles */
        .cloud {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0;
            animation: moveCloud 15s infinite linear;
        }

        .cloud-1 {
            width: 60px;
            height: 30px;
            top: 30px;
            left: -60px;
            animation-delay: 0s;
        }

        .cloud-2 {
            width: 80px;
            height: 40px;
            top: 70px;
            left: -80px;
            animation-delay: 5s;
        }

        .cloud-3 {
            width: 40px;
            height: 20px;
            top: 120px;
            left: -40px;
            animation-delay: 9s;
        }

        .wind-line {
            position: absolute;
            height: 2px;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scaleX(0);
            opacity: 0;
            animation: windLine 4s infinite;
        }

        .line-1 {
            width: 50px;
            top: 50px;
            left: 30px;
            animation-delay: 0.5s;
        }

        .line-2 {
            width: 70px;
            top: 90px;
            left: 60px;
            animation-delay: 1.5s;
        }

        .line-3 {
            width: 40px;
            top: 130px;
            left: 40px;
            animation-delay: 2.5s;
        }

        .tree {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 10px;
            height: 80px;
            background-color: #4b3621;
        }

        .tree-top {
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 80px;
            background-color: #2e7d32;
            border-radius: 50% 50% 5% 5%;
            animation: treeSwaying 3s infinite ease-in-out;
            transform-origin: bottom center;
        }

        @keyframes moveCloud {
            0% {
                transform: translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateX(350px);
                opacity: 0;
            }
        }

        @keyframes windLine {
            0% {
                transform: scaleX(0);
                opacity: 0;
                transform-origin: left center;
            }
            50% {
                transform: scaleX(1);
                opacity: 0.7;
                transform-origin: left center;
            }
            100% {
                transform: scaleX(0);
                opacity: 0;
                transform-origin: right center;
            }
        }

        @keyframes treeSwaying {
            0%, 100% {
                transform: translateX(-50%) rotate(5deg);
            }
            50% {
                transform: translateX(-50%) rotate(-5deg);
            }
        }

        /* Rain Card Styles */
        .raindrop {
            position: absolute;
            width: 2px;
            height: 20px;
            background-color: rgba(255, 255, 255, 0.7);
            top: -20px;
            opacity: 0;
            animation: rainFall 1.5s linear infinite;
        }

        .puddle {
            position: absolute;
            width: 10px;
            height: 3px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            bottom: 10px;
            transform: scale(0);
            opacity: 0;
            animation: puddleForm 3s linear infinite;
        }

        @keyframes rainFall {
            0% {
                top: -20px;
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                top: 200px;
                opacity: 0;
            }
        }

        @keyframes puddleForm {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                transform: scale(1);
                opacity: 0.7;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }

        /* Sun Card Styles */
        .sun {
            position: absolute;
            width: 70px;
            height: 70px;
            background-color: #FFD700;
            border-radius: 50%;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0 0 50px #FF8C00;
            opacity: 0;
            animation: sunAppear 2s forwards, sunPulse 4s infinite 2s;
        }

        .sun-ray {
            position: absolute;
            background-color: #FFD700;
            top: 50%;
            left: 50%;
            transform-origin: center;
            opacity: 0;
            animation: rayAppear 3s forwards, rayPulse 3s infinite 3s;
        }

        .ray-1 {
            width: 100px;
            height: 3px;
            transform: translate(-50%, -50%) rotate(0deg);
            animation-delay: 0.5s, 3.5s;
        }

        .ray-2 {
            width: 100px;
            height: 3px;
            transform: translate(-50%, -50%) rotate(45deg);
            animation-delay: 1s, 4s;
        }

        .ray-3 {
            width: 100px;
            height: 3px;
            transform: translate(-50%, -50%) rotate(90deg);
            animation-delay: 1.5s, 4.5s;
        }

        .ray-4 {
            width: 100px;
            height: 3px;
            transform: translate(-50%, -50%) rotate(135deg);
            animation-delay: 2s, 5s;
        }

        @keyframes sunAppear {
            0% {
                opacity: 0;
                transform: translateX(-50%) scale(0.5);
            }
            100% {
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }
        }

        @keyframes sunPulse {
            0%, 100% {
                box-shadow: 0 0 40px #FF8C00;
            }
            50% {
                box-shadow: 0 0 60px #FF8C00;
            }
        }

        @keyframes rayAppear {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 0.8;
            }
        }

        @keyframes rayPulse {
            0%, 100% {
                width: 90px;
            }
            50% {
                width: 110px;
            }
        }

        /* Snow Card Styles */
        .snowflake {
            position: absolute;
            color: white;
            font-size: 16px;
            top: -20px;
            opacity: 0;
            animation: snowFall linear infinite;
        }

        .snow-accumulation {
            position: absolute;
            height: 15px;
            background-color: rgba(255, 255, 255, 0.8);
            bottom: 0;
            left: 0;
            right: 0;
            transform: scaleY(0);
            transform-origin: bottom;
            animation: accumulateSnow 8s forwards;
        }

        @keyframes snowFall {
            0% {
                top: -20px;
                opacity: 0;
                transform: translateX(0) rotate(0deg);
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                top: 200px;
                opacity: 0;
                transform: translateX(20px) rotate(360deg);
            }
        }

        @keyframes accumulateSnow {
            0% {
                transform: scaleY(0);
            }
            100% {
                transform: scaleY(1);
            }
        }

        /* Control buttons */
        .controls {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            gap: 10px;
        }

        button {
            padding: 8px 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Wind Card -->
        <div class="weather-card" id="wind-card">
            <div class="card-header">
                <div class="weather-type">风 / Wind</div>
                <div class="temperature">18°C</div>
            </div>
            <div class="card-content">
                <div class="cloud cloud-1"></div>
                <div class="cloud cloud-2"></div>
                <div class="cloud cloud-3"></div>
                <div class="wind-line line-1"></div>
                <div class="wind-line line-2"></div>
                <div class="wind-line line-3"></div>
                <div class="tree"></div>
                <div class="tree-top"></div>
            </div>
        </div>

        <!-- Rain Card -->
        <div class="weather-card" id="rain-card">
            <div class="card-header">
                <div class="weather-type">雨 / Rain</div>
                <div class="temperature">12°C</div>
            </div>
            <div class="card-content" id="rain-content">
                <!-- Raindrops will be added by JavaScript -->
                <div class="snow-accumulation" style="height: 0;"></div>
            </div>
        </div>

        <!-- Sun Card -->
        <div class="weather-card" id="sun-card">
            <div class="card-header">
                <div class="weather-type">晴 / Sun</div>
                <div class="temperature">28°C</div>
            </div>
            <div class="card-content">
                <div class="sun">
                    <div class="sun-ray ray-1"></div>
                    <div class="sun-ray ray-2"></div>
                    <div class="sun-ray ray-3"></div>
                    <div class="sun-ray ray-4"></div>
                </div>
            </div>
        </div>

        <!-- Snow Card -->
        <div class="weather-card" id="snow-card">
            <div class="card-header">
                <div class="weather-type">雪 / Snow</div>
                <div class="temperature">-5°C</div>
            </div>
            <div class="card-content" id="snow-content">
                <!-- Snowflakes will be added by JavaScript -->
                <div class="snow-accumulation"></div>
            </div>
        </div>
    </div>

    <div class="controls">
        <button id="restart-btn">Restart Animations</button>
    </div>

    <script>
        // Create and position raindrops
        function createRaindrops() {
            const rainContent = document.getElementById('rain-content');
            // Clear existing raindrops
            const existingRaindrops = rainContent.querySelectorAll('.raindrop');
            existingRaindrops.forEach(drop => drop.remove());
            
            // Create new raindrops
            for (let i = 0; i < 30; i++) {
                const raindrop = document.createElement('div');
                raindrop.className = 'raindrop';
                raindrop.style.left = Math.random() * 100 + '%';
                raindrop.style.animationDuration = (1 + Math.random() * 1) + 's';
                raindrop.style.animationDelay = Math.random() * 2 + 's';
                rainContent.appendChild(raindrop);
            }
            
            // Create puddles
            for (let i = 0; i < 8; i++) {
                const puddle = document.createElement('div');
                puddle.className = 'puddle';
                puddle.style.left = (20 + Math.random() * 60) + '%';
                puddle.style.animationDelay = Math.random() * 3 + 's';
                rainContent.appendChild(puddle);
            }
        }
        
      // Create and position snowflakes
      function createSnowflakes() {
            const snowContent = document.getElementById('snow-content');
            // Clear existing snowflakes
            const existingSnowflakes = snowContent.querySelectorAll('.snowflake');
            existingSnowflakes.forEach(flake => flake.remove());
            
            // Create new snowflakes
            for (let i = 0; i < 30; i++) {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.innerHTML = '❄';
                snowflake.style.left = Math.random() * 100 + '%';
                snowflake.style.animationDuration = (3 + Math.random() * 5) + 's';
                snowflake.style.animationDelay = Math.random() * 5 + 's';
                snowflake.style.fontSize = (10 + Math.random() * 10) + 'px';
                snowContent.appendChild(snowflake);
            }
        }

        // Function to restart all animations
        function restartAnimations() {
            // Restart rain animation
            createRaindrops();
            
            // Restart snow animation
            createSnowflakes();
            
            // Restart sun animation by recreating the element
            const sunCard = document.getElementById('sun-card');
            const sunContent = sunCard.querySelector('.card-content');
            const oldSun = sunContent.querySelector('.sun');
            
            if (oldSun) {
                const newSun = oldSun.cloneNode(true);
                sunContent.removeChild(oldSun);
                sunContent.appendChild(newSun);
            }
            
            // Restart wind animation by recreating elements
            const windCard = document.getElementById('wind-card');
            const windContent = windCard.querySelector('.card-content');
            
            // Clone and replace clouds
            const clouds = windContent.querySelectorAll('.cloud');
            clouds.forEach(cloud => {
                const newCloud = cloud.cloneNode(true);
                cloud.parentNode.replaceChild(newCloud, cloud);
            });
            
            // Clone and replace wind lines
            const windLines = windContent.querySelectorAll('.wind-line');
            windLines.forEach(line => {
                const newLine = line.cloneNode(true);
                line.parentNode.replaceChild(newLine, line);
            });
            
            // Restart tree swaying animation
            const treeTop = windContent.querySelector('.tree-top');
            if (treeTop) {
                const newTreeTop = treeTop.cloneNode(true);
                treeTop.parentNode.replaceChild(newTreeTop, treeTop);
            }
            
            // Restart snow accumulation animation
            const snowAccumulation = document.querySelector('#snow-card .snow-accumulation');
            if (snowAccumulation) {
                const newSnowAccumulation = snowAccumulation.cloneNode(true);
                snowAccumulation.parentNode.replaceChild(newSnowAccumulation, snowAccumulation);
            }
        }

        // Initialize weather animations
        function initWeatherAnimations() {
            createRaindrops();
            createSnowflakes();
            
            // Add event listener to restart button
            document.getElementById('restart-btn').addEventListener('click', restartAnimations);
        }

        // Run animations when page loads
        window.addEventListener('load', initWeatherAnimations);
    </script>
</body>
</html>
`;

/**
 * 空白HTML模板
 */
export const emptyHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* 在这里添加CSS */
  </style>
</head>
<body>
  <!-- 在这里添加HTML内容 -->
  
  <script>
    // 在这里添加JavaScript
  </script>
</body>
</html>`;

/**
 * 基础Vue组件模板
 */
export const vueComponentTemplate = `<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="count++">点击了 {{ count }} 次</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Vue 组件')
const message = ref('这是一个Vue组件示例')
const count = ref(0)
</script>

<style scoped>
h1 {
  color: #42b883;
}
button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>`; 
