import React, { useState, useEffect, useRef } from 'react';
import { Bell, Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import styles from './NotificationDropdown.module.css';
import type { Notification } from '../../types';

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) return JSON.parse(saved);
    
    const initial: Notification[] = [
      {
        id: '1',
        title: 'Welcome!',
        message: 'Start your learning journey by taking a TOEIC mock test.',
        type: 'info',
        date: new Date().toISOString(),
        isRead: false
      },
      {
        id: '2',
        title: 'New Content',
        message: 'IELTS Academic Reading 02 is now available.',
        type: 'success',
        date: new Date().toISOString(),
        isRead: false
      }
    ];
    localStorage.setItem('notifications', JSON.stringify(initial));
    return initial;
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={18} className={styles.successIcon} />;
      case 'warning': return <AlertTriangle size={18} className={styles.warningIcon} />;
      default: return <Info size={18} className={styles.infoIcon} />;
    }
  };

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button className={styles.bellBtn} onClick={() => setIsOpen(!isOpen)}>
        <Bell size={20} />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className={styles.markAllBtn}>
                Mark all as read
              </button>
            )}
          </div>

          <div className={styles.list}>
            {notifications.length > 0 ? (
              notifications.map(n => (
                <div 
                  key={n.id} 
                  className={`${styles.item} ${n.isRead ? '' : styles.unread}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className={styles.itemIcon}>
                    {getIcon(n.type)}
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemHeader}>
                      <h4>{n.title}</h4>
                      <button 
                        className={styles.removeBtn}
                        onClick={(e) => removeNotification(n.id, e)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p>{n.message}</p>
                    <span className={styles.date}>
                      {new Date(n.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
