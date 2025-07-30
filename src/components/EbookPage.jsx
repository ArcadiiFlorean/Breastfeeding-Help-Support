import React from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import DocumentsPublic from './DocumentsPublic';

const EbookPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fef6f2] via-[#fdf4ef] to-[#fcf1eb]">
            <Header />
            
            {/* Hero Section pentru Ebook Page */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                {/* Background decorativ */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-[#b06b4c]/10 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-amber-200/20 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-rose-200/30 rounded-full animate-pulse delay-300"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-sm text-[#b06b4c] font-medium mb-8 shadow-lg">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Resurse gratuite pentru mame
                    </div>
                    
                    {/* Titlu principal */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#b06b4c] leading-tight mb-6">
                        📚 Biblioteca Ta de 
                        <span className="relative inline-block ml-4">
                            <span className="text-amber-900">Resurse</span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                        </span>
                    </h1>
                    
                    <p className="text-xl lg:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                        Descarcă ghiduri practice, formulare utile și resurse educaționale pentru a-ți sprijini călătoria în alăptare. Toate documentele sunt gratuite și create special pentru tine!
                    </p>
                    
                    {/* Statistici rapide */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-[#b06b4c] mb-2">100%</div>
                            <div className="text-gray-600">Gratuit</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-[#b06b4c] mb-2">PDF</div>
                            <div className="text-gray-600">Format</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-[#b06b4c] mb-2">24/7</div>
                            <div className="text-gray-600">Accesibil</div>
                        </div>
                    </div>
                    
                    {/* Call to action pentru navigare rapidă */}
                    <div className="bg-gradient-to-r from-amber-100 to-rose-100 rounded-2xl p-8 max-w-4xl mx-auto">
                        <p className="text-lg text-gray-700 mb-4">
                            💡 <strong>Sfat:</strong> Descarcă documentele și păstrează-le pe telefon pentru acces rapid oricând ai nevoie!
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                Ghiduri pas cu pas
                            </span>
                            <span className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Formulare practice
                            </span>
                            <span className="flex items-center">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                Planuri alimentare
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Secțiunea de documente */}
            <DocumentsPublic />
            
            {/* Secțiune de încurajare */}
            <section className="py-16 bg-gradient-to-r from-[#b06b4c]/10 to-amber-100/30">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-[#b06b4c] mb-6">
                            🤗 Ai nevoie de mai mult sprijin?
                        </h2>
                        <p className="text-xl text-gray-700 mb-8">
                            Documentele sunt un primul pas excelent, dar uneori ai nevoie de îndrumare personalizată. Sunt aici pentru tine!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a 
                                href="/BookingWizard"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#b06b4c] to-[#965a42] text-white font-bold rounded-xl hover:from-[#965a42] hover:to-[#7d4a37] transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Programează o consultație
                            </a>
                            
                            <a 
                                href="/"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#b06b4c] text-[#b06b4c] font-bold rounded-xl hover:bg-[#b06b4c] hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Înapoi la pagina principală
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default EbookPage;