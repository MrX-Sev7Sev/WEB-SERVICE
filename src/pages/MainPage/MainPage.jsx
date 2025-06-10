import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GameCard from '../../components/GameCard';
import NavigationSidebar from '../../components/NavigationSidebar';
import './MainPage.css';

export default function MainPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [articles] = useState([
    {
      id: 1,
      title: 'Uno',
      image: '/assets/articles/uno.jpg',
      link: '/articles/uno'
    },
    {
      id: 2,
      title: 'Карты',
      image: '/assets/articles/cards.jpg',
      link: '/articles/cards'
    },
    {
      id: 3,
      title: 'Шахматы',
      image: '/assets/articles/chess.jpg',
      link: '/articles/chess'
    },
    {
      id: 4,
      title: 'Шашки',
      image: '/assets/articles/checkers.jpg',
      link: '/articles/checkers'
    },
    {
      id: 5,
      title: 'Нарды',
      image: '/assets/articles/backgammon.jpg',
      link: '/articles/backgammon'
    },
    {
      id: 6,
      title: 'Мафия',
      image: '/assets/articles/mafia.jpg',
      link: '/articles/mafia'
    },
    {
      id: 7,
      title: 'Монополия',
      image: '/assets/articles/monopoly.jpg',
      link: '/articles/monopoly'
    },
    {
      id: 8,
      title: 'Дженга',
      image: '/assets/articles/jenga.jpg',
      link: '/articles/jenga'
    },
    {
      id: 9,
      title: 'Dungeons & Dragons',
      image: '/assets/articles/dnd.jpg',
      link: '/articles/dnd'
    },
    {
      id: 10,
      title: 'Каркассон',
      image: '/assets/articles/carcassonne.jpg',
      link: '/articles/carcassonne'
    },
    {
      id: 11,
      title: 'Бункер',
      image: '/assets/articles/bunker.jpg',
      link: '/articles/bunker'
    },
    {
      id: 12,
      title: 'Пандемия',
      image: '/assets/articles/pandemic.jpg',
      link: '/articles/pandemic'
    },
    {
      id: 13,
      title: 'Эрудит',
      image: '/assets/articles/erudite.jpg',
      link: '/articles/erudite'
    },
    {
      id: 14,
      title: 'Алиас',
      image: '/assets/articles/alias.jpg',
      link: '/articles/alias'
    },
    {
      id: 15,
      title: 'Угадай, Кто?',
      image: '/assets/articles/guess-who.jpg',
      link: '/articles/guess-who'
    },
    {
      id: 16,
      title: 'Имаджинариум',
      image: '/assets/articles/imaginarium.jpg',
      link: '/articles/imaginarium'
    },
    {
      id: 17,
      title: 'Свинтус',
      image: '/assets/articles/svintus.jpg',
      link: '/articles/svintus'
    },
    {
      id: 18,
      title: 'Крокодил',
      image: '/assets/articles/crocodile.jpg',
      link: '/articles/crocodile'
    }
  ]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 4 < articles.length ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  
  // Проверка, активна ли стрелка вправо
  const isNextDisabled = currentIndex + 4 >= articles.length;

  // Проверка, активна ли стрелка влево
  const isPrevDisabled = currentIndex === 0;

  useEffect(() => {
    const updateGames = () => {
      const savedGames = JSON.parse(localStorage.getItem('games')) || [];
      setGames(savedGames.filter(game => 
        game.players.includes(user?.email) || 
        game.admin === user?.email
      ));
    };

    window.addEventListener('storage', updateGames);
    updateGames();
    
    return () => window.removeEventListener('storage', updateGames);
  }, [user?.email]);

  const handleDeleteGame = (gameId) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    localStorage.setItem('games', JSON.stringify(updatedGames));
    setGames(updatedGames);
  };

  return (
    <div className="main-page-container">
      <NavigationSidebar />
      
      <div className="main-content">
        <section className="user-games-section">
          <div className="section-header">
            <h2 className="section-title">Ваши игры</h2>
            <button onClick={logout} className="logout-button">
              Выйти
            </button>
          </div>

          <div className="games-grid">
            {games.length > 0 ? (
              games.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game}
                  onDelete={handleDeleteGame}
                />
              ))
            ) : (
              <div className="no-games-content">
                <p className="no-games-text">У вас пока нет предстоящих игр</p>
                <img 
                  src="/assets/img/no-games-dino.png" 
                  alt="Нет активных игр" 
                  className="no-games-image"
                />
              </div>
            )}
          </div>
        </section>

        <section className="articles-section">
        <h2 className="articles-title">Популярные игры</h2>
        <div className="articles-gallery">
        <button 
          className={`gallery-button prev-button ${isPrevDisabled ? 'disabled' : ''}`} 
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          <img 
            src="/assets/img/arrow-left.svg" 
            alt="Предыдущие" 
          />
        </button>
                    
          <div className="articles-grid">
            {articles.slice(currentIndex, currentIndex + 4).map(article => (
              <div 
                key={article.id} 
                className="article-card"
                onClick={() => navigate(article.link)}
              >
                <div 
                  className="article-image"
                  style={{ backgroundImage: `url(${article.image})` }}
                >
                  <div className="article-overlay">
                    <h3>{article.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

        <button 
          className={`gallery-button next-button ${isNextDisabled ? 'disabled' : ''}`} 
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          <img 
            src="/assets/img/arrow-right.svg" 
            alt="Следующие" 
          />
        </button>
        </div>
      </section>
      </div>
    </div>
  );
}