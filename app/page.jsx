'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StickyNote from '@/components/StickyNote';

import Dashboard from '@/components/lessons/Dashboard';
import ClassicalCiphers from '@/components/lessons/ClassicalCiphers';
import TranspositionCipher from '@/components/lessons/TranspositionCipher';
import RSACryptography from '@/components/lessons/RSACryptography';
import Quiz from '@/components/lessons/Quiz';

export default function Home() {

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentLesson, setCurrentLesson] = useState('caesar');

  const handleLessonChange = (lessonId) => {
    setCurrentLesson(lessonId);
  };

  const renderMainContent = () => {

    switch (currentPage) {

      case 'dashboard':
        return <Dashboard />;

      case 'classical':
        return <ClassicalCiphers currentLesson={currentLesson} />;

      case 'transposition':
        return <TranspositionCipher />;

      case 'rsa':
        return <RSACryptography currentLesson={currentLesson} />;

      case 'quiz':
        return <Quiz />;

      default:
        return <Dashboard />;
    }
  };

  return (

    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Layout */}
      <div className="lg:flex">

        {/* Sidebar only for lesson pages */}
        {currentPage !== 'dashboard' && currentPage !== 'quiz' && (

          <Sidebar
            currentPage={currentPage}
            currentLesson={currentLesson}
            onLessonChange={handleLessonChange}
          />

        )}

        {/* Main Content */}
        <main className="flex-1 w-full p-4 md:p-8">

          {renderMainContent()}

        </main>

      </div>

      {/* Sticky note (optional) */}
      {/* <StickyNote currentPage={currentPage} currentLesson={currentLesson} /> */}

    </div>

  );
}