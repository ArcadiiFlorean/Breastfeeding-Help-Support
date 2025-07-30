import React, { useState, useEffect } from 'react';

const DocumentsPublic = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const API_URL = '/admin/documents_public_api.php'; // Calea relativă cu proxy

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            console.log('🔍 Încearcă să acceseze:', API_URL);
            
            const response = await fetch(API_URL);
            console.log('📡 Status răspuns:', response.status);
            console.log('📡 Response OK:', response.ok);
            
            const data = await response.json();
            console.log('📄 Date primite:', data);
            
            if (data.success) {
                setDocuments(data.data);
                console.log('✅ Documente setate:', data.data.length);
            } else {
                console.log('❌ API returnează eroare:', data.error);
                setError('Eroare la încărcarea documentelor');
            }
        } catch (err) {
            console.error('💥 Eroare fetch:', err);
            setError('Eroare de conexiune: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (id, filename) => {
        // Deschide link-ul de descărcare în tab nou
        window.open(`${API_URL}?download=1&id=${id}`, '_blank');
    };

    const handlePreview = (id) => {
        // Deschide previzualizarea în tab nou
        window.open(`${API_URL}?preview=1&id=${id}`, '_blank');
    };

    const handlePurchase = (id, price, title) => {
        // Redirecționează către pagina de plată
        const purchaseData = {
            documentId: id,
            price: price,
            title: title,
            type: 'document'
        };
        
        // Salvează datele în localStorage pentru pagina de plată
        localStorage.setItem('purchaseData', JSON.stringify(purchaseData));
        
        // Redirecționează către pagina de plată
        window.location.href = '/payment';
    };

    const filteredDocuments = selectedCategory 
        ? documents.filter(doc => doc.category === selectedCategory)
        : documents;

    const categories = [...new Set(documents.map(doc => doc.category))];

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Se încarcă documentele...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-red-600">❌ {error}</p>
                </div>
            </section>
        );
    }

    if (documents.length === 0) {
        return null; // Nu afișa secțiunea dacă nu sunt documente
    }

    return (
        <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        📚 Resurse Utile pentru Mamici
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Descarcă ghiduri, formulare și resurse educaționale pentru a-ți sprijini călătoria în alăptare
                    </p>
                </div>

                {/* Filtre categorii */}
                {categories.length > 1 && (
                    <div className="flex justify-center mb-12">
                        <div className="flex flex-wrap gap-3">
                            <button 
                                onClick={() => setSelectedCategory('')}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                    selectedCategory === '' 
                                        ? 'bg-pink-500 text-white shadow-lg' 
                                        : 'bg-white text-gray-700 hover:bg-pink-100 border border-gray-200'
                                }`}
                            >
                                Toate
                            </button>
                            {categories.map(category => (
                                <button 
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-full font-semibold capitalize transition-all duration-300 ${
                                        selectedCategory === category 
                                            ? 'bg-pink-500 text-white shadow-lg' 
                                            : 'bg-white text-gray-700 hover:bg-pink-100 border border-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Documente Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDocuments.map((doc, index) => (
                        <div 
                            key={doc.id} 
                            className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2 ${
                                !doc.is_free ? 'ring-2 ring-amber-300' : ''
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Badges pentru featured și paid */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-wrap gap-2">
                                    {doc.is_featured && (
                                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                                            ⭐ Recomandat
                                        </span>
                                    )}
                                    {!doc.is_free && (
                                        <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                                            💎 Premium
                                        </span>
                                    )}
                                </div>
                                
                                {/* Preț */}
                                <div className="text-right">
                                    {doc.is_free ? (
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                            GRATUIT
                                        </span>
                                    ) : (
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-amber-600">
                                                {doc.price} RON
                                            </div>
                                            <div className="text-xs text-gray-500">plată unică</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Icon și titlu */}
                            <div className="text-center mb-6">
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {doc.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                                    {doc.title}
                                </h3>
                                <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                                    {doc.category}
                                </span>
                            </div>

                            {/* Descriere */}
                            {doc.description && (
                                <p className="text-gray-600 text-center mb-6 line-clamp-3">
                                    {doc.description}
                                </p>
                            )}

                            {/* Info fișier */}
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                                <span className="flex items-center">
                                    📏 {doc.formatted_size}
                                </span>
                                <span className="flex items-center">
                                    📅 {doc.created_at_formatted}
                                </span>
                            </div>

                            {/* Downloads counter */}
                            {doc.downloads_count > 0 && (
                                <div className="text-center mb-4">
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        📥 {doc.downloads_count} descărcări
                                    </span>
                                </div>
                            )}

                            {/* Buton descărcare/cumpărare */}
                            {doc.is_free ? (
                                <button 
                                    onClick={() => handleDownload(doc.id, doc.original_filename)}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group"
                                >
                                    <span className="mr-2 group-hover:animate-bounce">⬇️</span>
                                    Descarcă Gratuit
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    {doc.preview_available && (
                                        <button 
                                            onClick={() => handlePreview(doc.id)}
                                            className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
                                        >
                                            <span className="mr-2">👁️</span>
                                            Previzualizare gratuită
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handlePurchase(doc.id, doc.price, doc.title)}
                                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group"
                                    >
                                        <span className="mr-2 group-hover:animate-bounce">💳</span>
                                        Cumpără pentru {doc.price} RON
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer informativ */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-8 max-w-4xl mx-auto">
                        <p className="text-gray-700 text-lg">
                            💡 <strong>Toate documentele sunt gratuite!</strong> Descarcă-le și folosește-le oricând ai nevoie de sprijin în călătoria ta de alăptare.
                        </p>
                        <p className="text-gray-600 mt-4">
                            Ai întrebări despre documentele disponibile? <a href="#contact" className="text-pink-600 font-semibold hover:underline">Contactează-mă!</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DocumentsPublic;