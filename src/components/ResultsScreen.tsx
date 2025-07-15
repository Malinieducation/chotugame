import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Clock, 
  CheckCircle, 
  RotateCcw, 
  Home,
  Apple,
  User
} from 'lucide-react';
import { GameData } from './DrawThePathGame';

interface ResultsScreenProps {
  gameData: GameData;
  onPlayAgain: () => void;
  onResetGame: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  gameData, 
  onPlayAgain, 
  onResetGame 
}) => {
  const getPerformanceMessage = (score: number) => {
    if (score === 100) return "Perfect! Outstanding work! 🌟";
    if (score >= 80) return "Excellent job! Well done! 👏";
    if (score >= 60) return "Good work! Keep it up! 👍";
    if (score >= 40) return "Nice try! You're learning! 😊";
    return "Keep practicing! You'll get better! 💪";
  };

  const getScoreColor = (score: number) => {
    if (score === 100) return "text-apple-red";
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-farm-green";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg animate-scale-in bg-card/95 backdrop-blur-sm border-2 border-apple-red/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Trophy className="w-16 h-16 text-sun-yellow" />
              <Star className="w-6 h-6 text-apple-red absolute -top-1 -right-1 animate-bounce-apple" />
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold text-primary">
            🎉 Congratulations {gameData.playerName}!
          </CardTitle>
          
          <p className="text-muted-foreground">
            {gameData.gameMode === 'critical-thinking' 
              ? "You've demonstrated excellent critical thinking skills!" 
              : "You've successfully helped Chotu learn about the apple journey!"
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center space-y-2">
            <div className={`text-4xl font-bold ${getScoreColor(gameData.score)}`}>
              {gameData.score}%
            </div>
            <p className="text-sm font-medium text-foreground">
              {getPerformanceMessage(gameData.score)}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-accent/30 rounded-lg p-4 text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-primary mx-auto" />
              <div className="text-lg font-bold text-foreground">
                {gameData.completedSteps}/{gameData.totalSteps}
              </div>
              <div className="text-xs text-muted-foreground">
                Steps Completed
              </div>
            </div>
            
            <div className="bg-sky-blue/30 rounded-lg p-4 text-center space-y-2">
              <Clock className="w-8 h-8 text-secondary-foreground mx-auto" />
              <div className="text-lg font-bold text-foreground">
                {gameData.completionTime}s
              </div>
              <div className="text-xs text-muted-foreground">
                Completion Time
              </div>
            </div>

            {gameData.gameMode === 'critical-thinking' && gameData.attempts && (
              <div className="col-span-2 bg-apple-red/20 rounded-lg p-4 text-center space-y-2">
                <Trophy className="w-8 h-8 text-apple-red mx-auto" />
                <div className="text-lg font-bold text-foreground">
                  {gameData.attempts}
                </div>
                <div className="text-xs text-muted-foreground">
                  Attempts to Success
                </div>
              </div>
            )}
          </div>

          {/* Achievement Badges */}
          <div className="space-y-3">
            <h3 className="font-semibold text-center text-foreground">
              🏆 Your Achievements
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {gameData.score === 100 && (
                <Badge className="bg-gradient-to-r from-sun-yellow to-apple-red text-white">
                  🌟 Perfect Score
                </Badge>
              )}
              {gameData.completedSteps === gameData.totalSteps && (
                <Badge className="bg-gradient-to-r from-farm-green to-accent-foreground text-white">
                  ✅ Journey Master
                </Badge>
              )}
              {gameData.completionTime < 60 && (
                <Badge className="bg-gradient-to-r from-sky-blue to-primary text-white">
                  ⚡ Speed Learner
                </Badge>
              )}
              {gameData.gameMode === 'critical-thinking' && gameData.attempts && gameData.attempts <= 3 && (
                <Badge className="bg-gradient-to-r from-apple-red to-primary text-white">
                  🧠 Critical Thinker
                </Badge>
              )}
              <Badge className="bg-gradient-to-r from-apple-green to-farm-green text-foreground">
                🍎 Apple Expert
              </Badge>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-apple-green/20 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Apple className="w-5 h-5 text-apple-red" />
              <span className="font-semibold text-sm text-foreground">Did you know?</span>
            </div>
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              {gameData.gameMode === 'critical-thinking' 
                ? "By drawing connections yourself, you've learned how each step in the apple journey depends on the previous one."
                : "The journey from farm to your table involves many people working together! Farmers, packers, transporters, and store owners all help bring fresh apples to families like Chotu's."
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onPlayAgain}
              className="w-full bg-gradient-to-r from-apple-red to-primary hover:from-apple-red/90 hover:to-primary/90"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            
            <Button
              onClick={onResetGame}
              variant="outline"
              className="w-full border-apple-red/30 hover:bg-apple-red/10"
            >
              <Home className="w-4 h-4 mr-2" />
              New Player
            </Button>
          </div>

          {/* Thank You Message */}
          <div className="text-center space-y-2">
            <User className="w-8 h-8 text-apple-red mx-auto animate-bounce-apple" />
            <p className="text-xs text-muted-foreground">
              Thank you for helping Chotu learn about where apples come from!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};