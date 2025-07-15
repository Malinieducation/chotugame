import React, { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { PathDrawingGame } from './PathDrawingGame';
import { DrawPathInteractive } from './DrawPathInteractive';
import { ResultsScreen } from './ResultsScreen';

export type GameStage = 'welcome' | 'playing' | 'interactive' | 'results';
export type GameMode = 'guided' | 'critical-thinking';

export interface GameData {
  playerName: string;
  completedSteps: number;
  totalSteps: number;
  completionTime: number;
  score: number;
  attempts?: number;
  gameMode: GameMode;
}

const DrawThePathGame: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>('welcome');
  const [gameData, setGameData] = useState<GameData>({
    playerName: '',
    completedSteps: 0,
    totalSteps: 9,
    completionTime: 0,
    score: 0,
    attempts: 0,
    gameMode: 'guided'
  });

  const startGame = (playerName: string, gameMode: GameMode) => {
    setGameData(prev => ({
      ...prev,
      playerName,
      gameMode,
      completedSteps: 0,
      completionTime: Date.now(),
      attempts: 0
    }));
    setGameStage(gameMode === 'guided' ? 'playing' : 'interactive');
  };

  const finishGame = (completedSteps: number) => {
    const completionTime = Math.round((Date.now() - gameData.completionTime) / 1000);
    const score = Math.round((completedSteps / gameData.totalSteps) * 100);
    
    setGameData(prev => ({
      ...prev,
      completedSteps,
      completionTime,
      score
    }));
    setGameStage('results');
  };

  const finishInteractiveGame = (score: number, attempts: number) => {
    const completionTime = Math.round((Date.now() - gameData.completionTime) / 1000);
    
    setGameData(prev => ({
      ...prev,
      completedSteps: score === 100 ? gameData.totalSteps : Math.round((score / 100) * gameData.totalSteps),
      completionTime,
      score,
      attempts
    }));
    setGameStage('results');
  };

  const resetGame = () => {
    setGameStage('welcome');
    setGameData({
      playerName: '',
      completedSteps: 0,
      totalSteps: 9,
      completionTime: 0,
      score: 0,
      attempts: 0,
      gameMode: 'guided'
    });
  };

  const playAgain = () => {
    setGameData(prev => ({
      ...prev,
      completedSteps: 0,
      completionTime: Date.now(),
      score: 0,
      attempts: 0
    }));
    setGameStage(gameData.gameMode === 'guided' ? 'playing' : 'interactive');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-blue to-accent">
      {gameStage === 'welcome' && <WelcomeScreen onStartGame={startGame} />}
      {gameStage === 'playing' && (
        <PathDrawingGame 
          playerName={gameData.playerName}
          onFinishGame={finishGame}
        />
      )}
      {gameStage === 'interactive' && (
        <DrawPathInteractive
          playerName={gameData.playerName}
          onComplete={finishInteractiveGame}
        />
      )}
      {gameStage === 'results' && (
        <ResultsScreen 
          gameData={gameData}
          onPlayAgain={playAgain}
          onResetGame={resetGame}
        />
      )}
    </div>
  );
};

export default DrawThePathGame;