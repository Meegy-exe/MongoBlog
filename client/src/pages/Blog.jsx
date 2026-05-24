// page daccueil du blog de luser
// inspiration skyblog

// imports
// link: permet de naviguer entre les pages sans reload
import { useParams, Link } from 'react-router-dom';
// components
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
// hooks
import { usePosts } from '../hooks/usePosts';
import { useCategories } from '../hooks/useCategories';

const Blog = () => {
  const { login } = useParams();

  // cible les fonctions du hook 
  const { posts, getPosts, handleDelete, isMyBlog } = usePosts(login);

  // cible les categories existantes pour la sidebar
  const { categories } = useCategories();

  return (
    // fond du site
    <div className="min-h-screen bg-[#E9E9E9] p-2 md:p-8 font-sans text-xs text-gray-800">

      {/* bloc principal */}
      <div className="flex flex-col md:flex-row min-h-[80vh] max-w-6xl mx-auto bg-white border border-gray-300 shadow-sm">

        {/* sidebar gauche (profil) */}
        <div className="w-full md:w-64 p-4 border-r border-gray-200">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center w-32 h-32 mx-auto border border-gray-400 p-1 mb-2 bg-gray-50">
              <span className="text-gray-400">Pas d'avatar</span>
            </div>
            <p className="text-fuchsia-600 font-bold mt-2 hover:underline cursor-pointer">
              xXx-{login}-xXx
            </p>
          </div>

          <div>
            <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">Description :</h3>
            <p className="italic text-gray-400 mt-2">
              Cet utilisateur n'a pas encore écrit de description...
            </p>
          </div>
        </div>

        {/* bloc central (article) */}
        <div className="w-full md:flex-1 p-4">

          {/* SI le blog est celui de luser co alors */}
          {isMyBlog && (
            <CreatePost onPostCreated={getPosts} />
          )}

          {/* SIL ny a aucun artcile alors */}
          {posts.length === 0 ? (
            // affiche ca par defaut
            <div className="border border-dashed border-gray-300 mt-4 text-center p-10 text-gray-500 italic ">
              Il n'y a aucun billet sur ce blog pour le moment.
            </div>
          ) : (
            // SIL y a des articles alors
            // map(): boucle pour afficher tous les articles
            <div className="mt-4 text-left">
              {posts.map((post) => (
                // ajout component
                <PostCard
                  key={post._id}
                  post={post}
                  login={login}
                  isMyBlog={isMyBlog}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* sidebar droite */}
        <div className="w-full p-4 border-l border-gray-200 hidden md:w-48 md:block">

          {/* infos */}
          <div className="mb-6">
            <h3
              className="mb-2 p-1 font-bold bg-gray-100 text-center border-t border-b border-gray-200">
              Infos
            </h3>
            <ul
              className="text-gray-600 space-y-1">
              <li>Billets : {posts.length}</li>
              <li>Commentaires : 0</li>
              <li>Amis : 0</li>
            </ul>
          </div>

          {/* tag categories */}
          <div className="mb-6">

            <h3
              className="mb-2 p-1 font-bold bg-gray-100 text-center border-t border-b border-gray-200 uppercase text-[11px]">
              Thèmes
            </h3>

            <ul
              className="text-gray-600 space-y-1 text-[11px] font-bold">

              <li className="mb-2">
                <Link
                  className="hover:text-fuchsia-600 transition-colors"
                  to={`/${login}`}>
                  TOUS LES BILLETS
                </Link>
              </li>

              {/* map boucle afficher cats + liens url selon */}
              {categories && categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    to={`/${login}?category=${cat.slug}`}
                    className="hover:text-fuchsia-600 transition-colors">
                    {/* affiche le nbr de cat */}
                    [ {cat.name} ] ({cat.postCount || 0})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Blog;