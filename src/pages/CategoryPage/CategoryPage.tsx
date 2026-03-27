import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockTests } from '../../data/tests';
import { Clock, BookOpen, ChevronRight, ArrowLeft, ChevronLeft, Calendar } from 'lucide-react';
import styles from './CategoryPage.module.css';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 10;
  
  const years = [2022, 2023, 2024, 2025, 2026];

  // Lọc theo category và năm
  const filteredByCategory = mockTests.filter(
    (test) => test.category.toLowerCase() === categoryId?.toLowerCase()
  );

  const filteredTests = filteredByCategory.filter(
    (test) => selectedYear === 'All' || test.year === selectedYear
  );

  // Pagination logic
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);

  const handleYearChange = (year: number | 'All') => {
    setSelectedYear(year);
    setCurrentPage(1); // Reset về trang 1 khi đổi năm
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.categoryPage}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Categories
        </Link>
        <h1 className={styles.title}>{categoryId?.toUpperCase()} Practice Tests</h1>
        
        {/* THANH CHỌN NĂM */}
        <div className={styles.yearFilter}>
          <button 
            className={`${styles.yearBtn} ${selectedYear === 'All' ? styles.activeYear : ''}`}
            onClick={() => handleYearChange('All')}
          >
            All Years
          </button>
          {years.map(year => (
            <button 
              key={year}
              className={`${styles.yearBtn} ${selectedYear === year ? styles.activeYear : ''}`}
              onClick={() => handleYearChange(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <p className={styles.subtitle}>
          Found {filteredTests.length} tests {selectedYear !== 'All' ? `from ${selectedYear}` : ''}.
        </p>
      </header>

      <section className={styles.testGrid}>
        {currentTests.length > 0 ? (
          currentTests.map((test) => (
            <div key={test.id} className={styles.testCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.testTitle}>{test.title}</h2>
                <span className={styles.yearBadge}>{test.year || 2026}</span>
              </div>
              <p className={styles.testDescription}>{test.description}</p>
              
              <div className={styles.testMeta}>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>{test.durationMinutes} min</span>
                </div>
                <div className={styles.metaItem}>
                  <BookOpen size={16} />
                  <span>{test.totalQuestions} questions</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar size={16} />
                  <span>Year: {test.year || 2026}</span>
                </div>
              </div>
              
              <Link to={`/test/${test.id}`} className={styles.startButton}>
                Start Test
                <ChevronRight size={18} />
              </Link>
            </div>
          ))
        ) : (
          <div className={styles.noTests}>
            <p>No tests found for {selectedYear === 'All' ? 'this category' : `the year ${selectedYear}`}.</p>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className={styles.pageBtn}
          >
            <ChevronLeft size={20} />
          </button>
          
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => paginate(idx + 1)}
              className={`${styles.pageBtn} ${currentPage === idx + 1 ? styles.activePage : ''}`}
            >
              {idx + 1}
            </button>
          ))}

          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={styles.pageBtn}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
