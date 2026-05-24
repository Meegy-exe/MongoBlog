// page daccueil du blog de luser
// inspiration skyblog

// imports
// link: permet de naviguer entre les pages sans reload
import { useParams, Link } from 'react-router-dom';
// components
import CreatePost from '../components/CreatePost';
// hooks
import { usePosts } from '../hooks/usePosts';

const Blog = () => {
  const { login } = useParams();

  // cible les fonctions du hook 
  const { posts, getPosts, handleDelete, isMyBlog } = usePosts(login);

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
                <div key={post._id} className="mb-10">

                  {/* titre */}
                  <Link
                    to={`/${login}/${post._id}`}
                    className="block mb-4">
                    <h2
                      className="bg-gray-100 text-center text-fuchsia-600 font-bold p-2 border-t border-b border-gray-200 text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>

                  {/* contenu*/}
                  <div className="p-4 mb-4 min-h-[100px] bg-gray-50 border border-dashed border-gray-300">
                    {/* whitespace-pre-wrap: important pour blogs (afficher les espaces) */}
                    <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* footer + date */}
                  <div className="flex justify-between items-center text-gray-500 mt-2 border-t border-gray-200 pt-2 text-[11px]">
                    <span>@Posté le {new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>

                    {/* btn */}
                    <div className="flex gap-4">
                      <Link
                        to={`/${login}/${post._id}`}
                        className="bg-gray-100 hover:bg-gray-200 text-blue-600 border border-gray-300 px-3 py-1 font-bold cursor-pointer transition-colors">
                        Voir & Commenter
                      </Link>
                      {isMyBlog && (
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="ml-4 bg-gray-100 hover:bg-gray-200 text-red-600 hover:text-red-800 border border-gray-300 px-3 py-1 font-bold cursor-pointer transition-colors">
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* sidebar droite (infos) */}
        <div className="w-full p-4 border-l border-gray-200 hidden md:w-48 md:block">
          <div className="mb-6">
            <h3 className="mb-2 p-1 font-bold bg-gray-100 text-center border-t border-b border-gray-200">
              Infos
            </h3>
            {/* affiche format de liste */}
            <ul className="text-gray-600 space-y-1">
              <li>Billets : {posts.length}</li>
              <li>Commentaires : 0</li>
              <li>Amis : 0</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;