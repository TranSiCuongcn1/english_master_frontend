import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Star, Target, BookOpen } from 'lucide-react';
import styles from './Leaderboard.module.css';
import type { LeaderboardEntry, TestResult, User } from '../../types';

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const results: TestResult[] = [];
    
    // Collect all results
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('result_')) {
        results.push(JSON.parse(localStorage.getItem(key)!));
      }
    }

    // Map results to users
    const userStats = users.map(user => {
      const userResults = results.filter(r => r.userEmail === user.email);
      const totalTests = userResults.length;
      const totalScore = userResults.reduce((acc, r) => acc + r.score, 0);
      const totalPossible = userResults.reduce((acc, r) => acc + r.totalQuestions, 0);
      const avgAccuracy = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

      return {
        userEmail: user.email,
        userName: user.name,
        totalTests,
        avgAccuracy,
        totalScore
      };
    }).filter(entry => entry.totalTests > 0) // Only show users who took tests
      .sort((a, b) => b.totalScore - a.totalScore || b.avgAccuracy - a.avgAccuracy);

    setEntries(userStats);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Trophy className={styles.titleIcon} size={48} />
          <div>
            <h1 className={styles.title}>Hall of Fame</h1>
            <p className={styles.subtitle}>Top performers in our learning community.</p>
          </div>
        </div>
      </header>

      <div className={styles.topThree}>
        {entries.slice(0, 3).map((entry, idx) => (
          <div key={entry.userEmail} className={`${styles.podium} ${styles[`rank${idx + 1}`]}`}>
            <div className={styles.medalWrapper}>
              {idx === 0 && <Medal className={styles.gold} size={40} />}
              {idx === 1 && <Medal className={styles.silver} size={36} />}
              {idx === 2 && <Medal className={styles.bronze} size={32} />}
            </div>
            <div className={styles.podiumAvatar}>
              {entry.userName.charAt(0).toUpperCase()}
            </div>
            <h3 className={styles.podiumName}>{entry.userName}</h3>
            <div className={styles.podiumScore}>{entry.totalScore} pts</div>
            <div className={styles.podiumStats}>
              <span>{entry.avgAccuracy}% Acc.</span>
              <span>{entry.totalTests} Tests</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Tests</th>
              <th>Accuracy</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={entry.userEmail} className={idx < 3 ? styles.highlightRow : ''}>
                <td>
                  <span className={styles.rankBadge}>{idx + 1}</span>
                </td>
                <td>
                  <div className={styles.userNameWrapper}>
                    <div className={styles.smallAvatar}>
                      {entry.userName.charAt(0).toUpperCase()}
                    </div>
                    <span>{entry.userName}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.statIconWrapper}>
                    <BookOpen size={16} />
                    {entry.totalTests}
                  </div>
                </td>
                <td>
                  <div className={styles.statIconWrapper}>
                    <Target size={16} />
                    {entry.avgAccuracy}%
                  </div>
                </td>
                <td>
                  <div className={styles.scoreWrapper}>
                    <Star size={16} className={styles.starIcon} />
                    {entry.totalScore}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {entries.length === 0 && (
          <div className={styles.emptyState}>
            No rankings available yet. Be the first to take a test!
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
