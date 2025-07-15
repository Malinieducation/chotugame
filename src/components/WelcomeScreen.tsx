import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, TreePine, Truck, Store, Brain, BookOpen, Target, Users } from 'lucide-react';
import { GameMode } from './DrawThePathGame';

interface WelcomeScreenProps {
  onStartGame: (playerName: string, gameMode: GameMode) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedMode, setSelectedMode] = useState<GameMode>('guided');

  const handleStartGame = () => {
    if (playerName.trim()) {
      onStartGame(playerName.trim(), selectedMode);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md animate-scale-in bg-card/95 backdrop-blur-sm border-2 border-apple-red/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <Apple className="w-8 h-8 text-apple-red animate-bounce-apple" />
            <TreePine className="w-8 h-8 text-farm-green" />
            <Truck className="w-8 h-8 text-muted-foreground" />
            <Store className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            🍎 Draw the Path Game
          </CardTitle>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Help Chotu follow the amazing journey of apples from farm to market! 
            Learn about each step and draw the path to complete the adventure.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Game Mode Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-foreground">
              Choose Your Adventure Mode:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Guided Mode */}
              <button
                onClick={() => setSelectedMode('guided')}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300 text-left space-y-2
                  ${selectedMode === 'guided' 
                    ? 'border-primary bg-primary/10 shadow-lg' 
                    : 'border-muted-foreground/30 bg-card hover:bg-accent'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span className="font-semibold">Detailed Step</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Step-by-step journey with detailed explanations. 
                </p>
              
              </button>

              {/* Critical Thinking Mode */}
              <button
                onClick={() => setSelectedMode('critical-thinking')}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300 text-left space-y-2
                  ${selectedMode === 'critical-thinking' 
                    ? 'border-apple-red bg-apple-red/10 shadow-lg' 
                    : 'border-muted-foreground/30 bg-card hover:bg-accent'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-apple-red" />
                  <span className="font-semibold">Draw the Path</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Draw and connect the path yourself! Think critically about the correct order.
                </p>
               
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="playerName" className="text-sm font-medium text-foreground">
              Enter your name:
            </label>
            <Input
              id="playerName"
              type="text"
              placeholder="What's your name?"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
              className="w-full"
            />
          </div>
          
          <Button
            onClick={handleStartGame}
            disabled={!playerName.trim()}
            className={`
              w-full font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg
              ${selectedMode === 'critical-thinking'
                ? 'bg-gradient-to-r from-apple-red to-primary hover:from-apple-red/90 hover:to-primary/90'
                : 'bg-gradient-to-r from-primary to-farm-green hover:from-primary/90 hover:to-farm-green/90'
              }
              text-white
            `}
          >
            {selectedMode === 'critical-thinking' ? '🧠 Start Draw the Path' : '🌟 Start Guided Adventure'}
          </Button>
          
          <div className="text-center text-xs text-muted-foreground">
            Educational game about apple supply chain • Choose your learning style
          </div>
        </CardContent>
      </Card>
    </div>
  );
};