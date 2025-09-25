import React, { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { mangaData } from '@/data/manga';
import MangaCard from '@/components/MangaCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Browse: React.FC = () => {
  const { translation } = useApp();
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const mangas = Object.values(mangaData);

  // Get unique genres
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    mangas.forEach(manga => {
      manga.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  }, [mangas]);

  // Filter mangas
  const filteredMangas = useMemo(() => {
    return mangas.filter(manga => {
      const matchesGenre = genreFilter === 'all' || manga.genres.includes(genreFilter);
      const matchesStatus = statusFilter === 'all' || manga.status === statusFilter;
      const matchesType = typeFilter === 'all' || manga.type === typeFilter;
      
      return matchesGenre && matchesStatus && matchesType;
    });
  }, [mangas, genreFilter, statusFilter, typeFilter]);

  const clearFilters = () => {
    setGenreFilter('all');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {translation.browseTitle}
      </h1>

      {/* Filters */}
      <div className="bg-card p-6 rounded-lg shadow-lg mb-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">
              {translation.genres}
            </label>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder={translation.allGenres} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{translation.allGenres}</SelectItem>
                {allGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {translation.status}
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder={translation.allStatuses} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{translation.allStatuses}</SelectItem>
                <SelectItem value="مستمر">{translation.ongoing}</SelectItem>
                <SelectItem value="مكتمل">{translation.completed}</SelectItem>
                <SelectItem value="متوقف">{translation.hiatus}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder={translation.allTypes} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{translation.allTypes}</SelectItem>
                <SelectItem value="manga">{translation.manga}</SelectItem>
                <SelectItem value="manhwa">{translation.manhwa}</SelectItem>
                <SelectItem value="manhua">{translation.manhua}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              مسح الفلاتر
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          تم العثور على {filteredMangas.length} مانجا
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-slide-up">
        {filteredMangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>

      {filteredMangas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            لم يتم العثور على نتائج مطابقة للفلاتر المحددة
          </p>
        </div>
      )}
    </div>
  );
};

export default Browse;