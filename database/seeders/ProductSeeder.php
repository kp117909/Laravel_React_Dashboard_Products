<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->info('No categories found, seeder stopped.');
            return;
        }

        // Create category mapping for easier assignment
        $categoryMap = $categories->keyBy('name');

        $productsData = $this->getProductsData();

        // Only seed if no products exist
        if (Product::count() == 0) {
            foreach ($productsData as $data) {
                $category = $categoryMap->get($data['category']);

                if (!$category) {
                    $this->command->warn("Category '{$data['category']}' not found for product '{$data['name']}'");
                    continue;
                }

                Product::create([
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'price' => $data['price'],
                    'average_rating' => $data['rating'],
                    'reviews_count' => $data['reviews'],
                    'is_available' => rand(0, 10) > 1, // 90% available, 10% unavailable
                    'image' => null,
                    'category_id' => $category->id,
                ]);
            }

            $this->command->info('Successfully seeded ' . count($productsData) . ' products with realistic names!');
        } else {
            $this->command->info('Products already exist, skipping seeding.');
        }
    }

    private function getProductsData()
    {
        return [
            // Fiction Books (10 products)
            ['name' => 'To Kill a Mockingbird', 'description' => 'Harper Lee\'s timeless classic about moral courage and justice in the American South.', 'price' => 56.99, 'category' => 'Fiction', 'rating' => 4.8, 'reviews' => 2847],
            ['name' => '1984', 'description' => 'George Orwell\'s dystopian masterpiece about totalitarian control and surveillance.', 'price' => 61.99, 'category' => 'Fiction', 'rating' => 4.7, 'reviews' => 3241],
            ['name' => 'Pride and Prejudice', 'description' => 'Jane Austen\'s beloved romance novel set in Georgian England.', 'price' => 52.99, 'category' => 'Fiction', 'rating' => 4.6, 'reviews' => 1876],
            ['name' => 'The Great Gatsby', 'description' => 'F. Scott Fitzgerald\'s portrait of the Jazz Age and the American Dream.', 'price' => 48.99, 'category' => 'Fiction', 'rating' => 4.4, 'reviews' => 2156],
            ['name' => 'One Hundred Years of Solitude', 'description' => 'Gabriel García Márquez\'s magical realism epic spanning generations.', 'price' => 69.99, 'category' => 'Fiction', 'rating' => 4.5, 'reviews' => 987],
            ['name' => 'The Catcher in the Rye', 'description' => 'J.D. Salinger\'s coming-of-age story about teenage rebellion and alienation.', 'price' => 54.99, 'category' => 'Fiction', 'rating' => 4.2, 'reviews' => 1654],
            ['name' => 'Beloved', 'description' => 'Toni Morrison\'s powerful novel about slavery and its lasting aftermath.', 'price' => 65.99, 'category' => 'Fiction', 'rating' => 4.6, 'reviews' => 743],
            ['name' => 'The Handmaid\'s Tale', 'description' => 'Margaret Atwood\'s dystopian vision of women\'s rights and reproductive freedom.', 'price' => 59.99, 'category' => 'Fiction', 'rating' => 4.5, 'reviews' => 1892],
            ['name' => 'Brave New World', 'description' => 'Aldous Huxley\'s prophetic novel about a controlled and stratified society.', 'price' => 52.99, 'category' => 'Fiction', 'rating' => 4.3, 'reviews' => 1432],
            ['name' => 'The Kite Runner', 'description' => 'Khaled Hosseini\'s moving story of friendship, guilt, and redemption.', 'price' => 63.99, 'category' => 'Fiction', 'rating' => 4.7, 'reviews' => 2134],

            // Non-Fiction Books (10 products)
            ['name' => 'Sapiens: A Brief History of Humankind', 'description' => 'Yuval Noah Harari\'s fascinating exploration of human evolution and society.', 'price' => 74.99, 'category' => 'Non-Fiction', 'rating' => 4.6, 'reviews' => 4521],
            ['name' => 'Educated', 'description' => 'Tara Westover\'s powerful memoir about education, family, and self-discovery.', 'price' => 69.99, 'category' => 'Non-Fiction', 'rating' => 4.7, 'reviews' => 3876],
            ['name' => 'Becoming', 'description' => 'Michelle Obama\'s inspiring and intimate autobiography.', 'price' => 79.99, 'category' => 'Non-Fiction', 'rating' => 4.8, 'reviews' => 5432],
            ['name' => 'The Immortal Life of Henrietta Lacks', 'description' => 'Rebecca Skloot\'s compelling story of science, ethics, and human rights.', 'price' => 65.99, 'category' => 'Non-Fiction', 'rating' => 4.5, 'reviews' => 2187],
            ['name' => 'Into the Wild', 'description' => 'Jon Krakauer\'s gripping account of Chris McCandless\'s Alaskan adventure.', 'price' => 61.99, 'category' => 'Non-Fiction', 'rating' => 4.4, 'reviews' => 1765],
            ['name' => 'Kitchen Confidential', 'description' => 'Anthony Bourdain\'s raw and honest memoir of restaurant life and culinary culture.', 'price' => 67.99, 'category' => 'Non-Fiction', 'rating' => 4.6, 'reviews' => 1987],
            ['name' => 'Wild', 'description' => 'Cheryl Strayed\'s transformative memoir of hiking the Pacific Crest Trail.', 'price' => 63.99, 'category' => 'Non-Fiction', 'rating' => 4.3, 'reviews' => 2345],
            ['name' => 'The Glass Castle', 'description' => 'Jeannette Walls\'s unforgettable memoir of an unconventional childhood.', 'price' => 61.99, 'category' => 'Non-Fiction', 'rating' => 4.5, 'reviews' => 1876],
            ['name' => 'Born a Crime', 'description' => 'Trevor Noah\'s compelling memoir of growing up in apartheid South Africa.', 'price' => 69.99, 'category' => 'Non-Fiction', 'rating' => 4.7, 'reviews' => 2654],
            ['name' => 'Quiet: The Power of Introverts', 'description' => 'Susan Cain\'s groundbreaking book celebrating the power of introversion.', 'price' => 72.99, 'category' => 'Non-Fiction', 'rating' => 4.4, 'reviews' => 2987],

            // Science & Technology (10 products)
            ['name' => 'Clean Code', 'description' => 'Robert Martin\'s essential handbook of agile software craftsmanship and best practices.', 'price' => 189.99, 'category' => 'Science & Technology', 'rating' => 4.8, 'reviews' => 1876],
            ['name' => 'The Pragmatic Programmer', 'description' => 'David Thomas and Andrew Hunt\'s timeless guide to software development mastery.', 'price' => 175.99, 'category' => 'Science & Technology', 'rating' => 4.7, 'reviews' => 2134],
            ['name' => 'Design Patterns', 'description' => 'Gang of Four\'s essential guide to reusable object-oriented software design.', 'price' => 197.99, 'category' => 'Science & Technology', 'rating' => 4.6, 'reviews' => 987],
            ['name' => 'Introduction to Algorithms', 'description' => 'The comprehensive guide to algorithms and data structures by CLRS.', 'price' => 395.99, 'category' => 'Science & Technology', 'rating' => 4.5, 'reviews' => 1432],
            ['name' => 'JavaScript: The Good Parts', 'description' => 'Douglas Crockford\'s definitive guide to JavaScript\'s best features and practices.', 'price' => 131.99, 'category' => 'Science & Technology', 'rating' => 4.4, 'reviews' => 1654],
            ['name' => 'Python Crash Course', 'description' => 'Eric Matthes\'s hands-on, project-based introduction to programming with Python.', 'price' => 153.99, 'category' => 'Science & Technology', 'rating' => 4.6, 'reviews' => 2876],
            ['name' => 'You Don\'t Know JS', 'description' => 'Kyle Simpson\'s deep dive into JavaScript\'s core mechanics and advanced concepts.', 'price' => 145.99, 'category' => 'Science & Technology', 'rating' => 4.7, 'reviews' => 1543],
            ['name' => 'The Mythical Man-Month', 'description' => 'Frederick Brooks\'s classic essays on software engineering and project management.', 'price' => 122.99, 'category' => 'Science & Technology', 'rating' => 4.5, 'reviews' => 876],
            ['name' => 'Refactoring', 'description' => 'Martin Fowler\'s comprehensive guide to improving existing code design and structure.', 'price' => 184.99, 'category' => 'Science & Technology', 'rating' => 4.6, 'reviews' => 1234],
            ['name' => 'The Art of Computer Programming', 'description' => 'Donald Knuth\'s legendary comprehensive series on computer science fundamentals.', 'price' => 879.99, 'category' => 'Science & Technology', 'rating' => 4.9, 'reviews' => 543],

            // Self-Help (10 products)
            ['name' => 'Atomic Habits', 'description' => 'James Clear\'s proven system for building good habits and breaking bad ones.', 'price' => 83.99, 'category' => 'Self-Help', 'rating' => 4.8, 'reviews' => 8765],
            ['name' => 'The 7 Habits of Highly Effective People', 'description' => 'Stephen Covey\'s timeless principles for personal and professional effectiveness.', 'price' => 74.99, 'category' => 'Self-Help', 'rating' => 4.6, 'reviews' => 5432],
            ['name' => 'Think and Grow Rich', 'description' => 'Napoleon Hill\'s classic philosophy of personal achievement and wealth building.', 'price' => 65.99, 'category' => 'Self-Help', 'rating' => 4.5, 'reviews' => 3214],
            ['name' => 'The Power of Now', 'description' => 'Eckhart Tolle\'s spiritual guide to living in the present moment.', 'price' => 69.99, 'category' => 'Self-Help', 'rating' => 4.4, 'reviews' => 2876],
            ['name' => 'How to Win Friends and Influence People', 'description' => 'Dale Carnegie\'s timeless guide to improving social skills and relationships.', 'price' => 61.99, 'category' => 'Self-Help', 'rating' => 4.5, 'reviews' => 4321],
            ['name' => 'The Subtle Art of Not Giving a F*ck', 'description' => 'Mark Manson\'s counterintuitive approach to living a good and meaningful life.', 'price' => 79.99, 'category' => 'Self-Help', 'rating' => 4.3, 'reviews' => 6543],
            ['name' => 'Mindset', 'description' => 'Carol Dweck\'s groundbreaking research on the psychology of success and motivation.', 'price' => 72.99, 'category' => 'Self-Help', 'rating' => 4.6, 'reviews' => 2987],
            ['name' => 'The Four Agreements', 'description' => 'Don Miguel Ruiz\'s practical guide to personal freedom and spiritual growth.', 'price' => 56.99, 'category' => 'Self-Help', 'rating' => 4.5, 'reviews' => 2134],
            ['name' => 'Daring Greatly', 'description' => 'Brené Brown\'s powerful exploration of vulnerability, courage, and authentic living.', 'price' => 69.99, 'category' => 'Self-Help', 'rating' => 4.7, 'reviews' => 3456],
            ['name' => 'The Miracle Morning', 'description' => 'Hal Elrod\'s life-changing morning routine for personal development and success.', 'price' => 65.99, 'category' => 'Self-Help', 'rating' => 4.4, 'reviews' => 1987],

            // Business & Economics (10 products)
            ['name' => 'Good to Great', 'description' => 'Jim Collins\'s comprehensive study of companies that achieved sustained excellence.', 'price' => 96.99, 'category' => 'Business & Economics', 'rating' => 4.6, 'reviews' => 3456],
            ['name' => 'The Lean Startup', 'description' => 'Eric Ries\'s revolutionary methodology for creating and managing successful businesses.', 'price' => 87.99, 'category' => 'Business & Economics', 'rating' => 4.5, 'reviews' => 2876],
            ['name' => 'Zero to One', 'description' => 'Peter Thiel\'s contrarian guide to building the future and creating unique value.', 'price' => 83.99, 'category' => 'Business & Economics', 'rating' => 4.4, 'reviews' => 2134],
            ['name' => 'The Innovator\'s Dilemma', 'description' => 'Clayton Christensen\'s groundbreaking theory of disruptive innovation and market dynamics.', 'price' => 105.99, 'category' => 'Business & Economics', 'rating' => 4.3, 'reviews' => 1654],
            ['name' => 'Freakonomics', 'description' => 'Steven Levitt\'s fascinating exploration of hidden economic forces in everyday life.', 'price' => 74.99, 'category' => 'Business & Economics', 'rating' => 4.5, 'reviews' => 3214],
            ['name' => 'The $100 Startup', 'description' => 'Chris Guillebeau\'s practical guide to entrepreneurship on a shoestring budget.', 'price' => 79.99, 'category' => 'Business & Economics', 'rating' => 4.2, 'reviews' => 1876],
            ['name' => 'Crossing the Chasm', 'description' => 'Geoffrey Moore\'s essential marketing strategy for technology products and startups.', 'price' => 101.99, 'category' => 'Business & Economics', 'rating' => 4.4, 'reviews' => 987],
            ['name' => 'The E-Myth Revisited', 'description' => 'Michael Gerber\'s guide to working on your business rather than in your business.', 'price' => 81.99, 'category' => 'Business & Economics', 'rating' => 4.3, 'reviews' => 1432],
            ['name' => 'Blue Ocean Strategy', 'description' => 'W. Chan Kim\'s innovative approach to creating uncontested market spaces.', 'price' => 109.99, 'category' => 'Business & Economics', 'rating' => 4.5, 'reviews' => 2345],
            ['name' => 'The Hard Thing About Hard Things', 'description' => 'Ben Horowitz\'s honest guide to building and running a successful business.', 'price' => 92.99, 'category' => 'Business & Economics', 'rating' => 4.6, 'reviews' => 1765],

            // Education (10 products)
            ['name' => 'A People\'s History of the United States', 'description' => 'Howard Zinn\'s alternative perspective on American history from the bottom up.', 'price' => 87.99, 'category' => 'Education', 'rating' => 4.5, 'reviews' => 2876],
            ['name' => 'The Elements of Style', 'description' => 'Strunk and White\'s essential and concise guide to English writing and grammar.', 'price' => 43.99, 'category' => 'Education', 'rating' => 4.4, 'reviews' => 3456],
            ['name' => 'Guns, Germs, and Steel', 'description' => 'Jared Diamond\'s Pulitzer Prize-winning study of human societies and geography.', 'price' => 79.99, 'category' => 'Education', 'rating' => 4.6, 'reviews' => 2134],
            ['name' => 'The Art of War', 'description' => 'Sun Tzu\'s ancient Chinese treatise on military strategy and tactics.', 'price' => 39.99, 'category' => 'Education', 'rating' => 4.3, 'reviews' => 1987],
            ['name' => 'A Brief History of Time', 'description' => 'Stephen Hawking\'s accessible exploration of cosmology and the universe.', 'price' => 69.99, 'category' => 'Education', 'rating' => 4.5, 'reviews' => 2654],
            ['name' => 'The Republic', 'description' => 'Plato\'s foundational philosophical work on justice, truth, and governance.', 'price' => 56.99, 'category' => 'Education', 'rating' => 4.2, 'reviews' => 876],
            ['name' => 'On the Origin of Species', 'description' => 'Charles Darwin\'s groundbreaking scientific theory of evolution by natural selection.', 'price' => 65.99, 'category' => 'Education', 'rating' => 4.4, 'reviews' => 1234],
            ['name' => 'The Wealth of Nations', 'description' => 'Adam Smith\'s foundational work on economics and the invisible hand of markets.', 'price' => 74.99, 'category' => 'Education', 'rating' => 4.1, 'reviews' => 654],
            ['name' => 'Silent Spring', 'description' => 'Rachel Carson\'s influential environmental science book that launched the modern movement.', 'price' => 61.99, 'category' => 'Education', 'rating' => 4.6, 'reviews' => 1543],
            ['name' => 'The Structure of Scientific Revolutions', 'description' => 'Thomas Kuhn\'s influential work on how scientific paradigms shift and evolve.', 'price' => 83.99, 'category' => 'Education', 'rating' => 4.3, 'reviews' => 987],

            // Children & Young Adult (10 products)
            ['name' => 'Harry Potter and the Sorcerer\'s Stone', 'description' => 'J.K. Rowling\'s magical adventure that launched the beloved wizarding series.', 'price' => 39.99, 'category' => 'Children & Young Adult', 'rating' => 4.8, 'reviews' => 9876],
            ['name' => 'The Hunger Games', 'description' => 'Suzanne Collins\'s gripping dystopian trilogy opener set in post-apocalyptic Panem.', 'price' => 43.99, 'category' => 'Children & Young Adult', 'rating' => 4.6, 'reviews' => 7654],
            ['name' => 'Wonder', 'description' => 'R.J. Palacio\'s heartwarming story about kindness, acceptance, and being different.', 'price' => 37.99, 'category' => 'Children & Young Adult', 'rating' => 4.7, 'reviews' => 5432],
            ['name' => 'The Fault in Our Stars', 'description' => 'John Green\'s emotional young adult romance about love, life, and mortality.', 'price' => 48.99, 'category' => 'Children & Young Adult', 'rating' => 4.5, 'reviews' => 6543],
            ['name' => 'Charlotte\'s Web', 'description' => 'E.B. White\'s timeless and beloved tale of friendship between a pig and spider.', 'price' => 35.99, 'category' => 'Children & Young Adult', 'rating' => 4.8, 'reviews' => 4321],
            ['name' => 'The Giver', 'description' => 'Lois Lowry\'s thought-provoking dystopian novel about conformity and individuality.', 'price' => 39.99, 'category' => 'Children & Young Adult', 'rating' => 4.4, 'reviews' => 3456],
            ['name' => 'Matilda', 'description' => 'Roald Dahl\'s delightful story of a brilliant girl with extraordinary telekinetic powers.', 'price' => 32.99, 'category' => 'Children & Young Adult', 'rating' => 4.6, 'reviews' => 2876],
            ['name' => 'The Outsiders', 'description' => 'S.E. Hinton\'s classic coming-of-age story about teenage gangs and social class.', 'price' => 41.99, 'category' => 'Children & Young Adult', 'rating' => 4.5, 'reviews' => 2134],
            ['name' => 'Bridge to Terabithia', 'description' => 'Katherine Paterson\'s emotional tale of childhood friendship, imagination, and loss.', 'price' => 35.99, 'category' => 'Children & Young Adult', 'rating' => 4.3, 'reviews' => 1987],
            ['name' => 'Holes', 'description' => 'Louis Sachar\'s award-winning adventure story combining past and present mysteries.', 'price' => 37.99, 'category' => 'Children & Young Adult', 'rating' => 4.5, 'reviews' => 2654],

            // Fantasy & Sci-Fi (10 products)
            ['name' => 'The Lord of the Rings: Fellowship', 'description' => 'J.R.R. Tolkien\'s epic fantasy adventure that defined the modern fantasy genre.', 'price' => 65.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.9, 'reviews' => 8765],
            ['name' => 'Dune', 'description' => 'Frank Herbert\'s complex science fiction masterpiece set on the desert planet Arrakis.', 'price' => 74.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.7, 'reviews' => 6543],
            ['name' => 'Game of Thrones', 'description' => 'George R.R. Martin\'s political fantasy epic of power, betrayal, and dragons.', 'price' => 69.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.6, 'reviews' => 9876],
            ['name' => 'The Hitchhiker\'s Guide to the Galaxy', 'description' => 'Douglas Adams\'s hilarious and absurd comedic space adventure series.', 'price' => 56.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.5, 'reviews' => 4321],
            ['name' => 'Ender\'s Game', 'description' => 'Orson Scott Card\'s military science fiction classic about child soldiers and alien warfare.', 'price' => 61.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.4, 'reviews' => 3456],
            ['name' => 'The Name of the Wind', 'description' => 'Patrick Rothfuss\'s beautifully written fantasy about the legendary Kvothe.', 'price' => 63.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.6, 'reviews' => 2876],
            ['name' => 'Foundation', 'description' => 'Isaac Asimov\'s groundbreaking galactic empire series about psychohistory and civilization.', 'price' => 59.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.5, 'reviews' => 2134],
            ['name' => 'The Way of Kings', 'description' => 'Brandon Sanderson\'s epic fantasy series opener set in the storm-swept world of Roshar.', 'price' => 79.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.8, 'reviews' => 3654],
            ['name' => 'Neuromancer', 'description' => 'William Gibson\'s influential cyberpunk classic that coined the term "cyberspace."', 'price' => 65.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.3, 'reviews' => 1876],
            ['name' => 'The Martian', 'description' => 'Andy Weir\'s scientifically accurate survival story of an astronaut stranded on Mars.', 'price' => 68.99, 'category' => 'Fantasy & Sci-Fi', 'rating' => 4.7, 'reviews' => 5432],

            // Romance (10 products)
            ['name' => 'Jane Eyre', 'description' => 'Charlotte Brontë\'s Gothic romance classic about love, independence, and social class.', 'price' => 52.99, 'category' => 'Romance', 'rating' => 4.5, 'reviews' => 4321],
            ['name' => 'The Notebook', 'description' => 'Nicholas Sparks\'s tearjerking love story that spans decades of devotion.', 'price' => 56.99, 'category' => 'Romance', 'rating' => 4.4, 'reviews' => 3456],
            ['name' => 'Me Before You', 'description' => 'Jojo Moyes\'s emotionally devastating romance about love, loss, and living fully.', 'price' => 61.99, 'category' => 'Romance', 'rating' => 4.5, 'reviews' => 2876],
            ['name' => 'The Kiss Quotient', 'description' => 'Helen Hoang\'s contemporary romance featuring neurodivergent representation and steamy scenes.', 'price' => 65.99, 'category' => 'Romance', 'rating' => 4.3, 'reviews' => 1987],
            ['name' => 'Outlander', 'description' => 'Diana Gabaldon\'s time-traveling historical romance between Claire and Jamie Fraser.', 'price' => 69.99, 'category' => 'Romance', 'rating' => 4.6, 'reviews' => 5432],
            ['name' => 'The Hating Game', 'description' => 'Sally Thorne\'s enemies-to-lovers office romance filled with sexual tension and banter.', 'price' => 59.99, 'category' => 'Romance', 'rating' => 4.4, 'reviews' => 2134],
            ['name' => 'It Ends with Us', 'description' => 'Colleen Hoover\'s emotional contemporary romance dealing with love and domestic violence.', 'price' => 63.99, 'category' => 'Romance', 'rating' => 4.2, 'reviews' => 6543],
            ['name' => 'The Time Traveler\'s Wife', 'description' => 'Audrey Niffenegger\'s unique love story complicated by involuntary time travel.', 'price' => 61.99, 'category' => 'Romance', 'rating' => 4.3, 'reviews' => 2654],
            ['name' => 'Eleanor Oliphant Is Completely Fine', 'description' => 'Gail Honeyman\'s touching story about loneliness, healing, and human connection.', 'price' => 65.99, 'category' => 'Romance', 'rating' => 4.5, 'reviews' => 3214],
            ['name' => 'The Seven Husbands of Evelyn Hugo', 'description' => 'Taylor Jenkins Reid\'s glamorous Hollywood romance spanning decades of secrets.', 'price' => 68.99, 'category' => 'Romance', 'rating' => 4.7, 'reviews' => 7654],

            // Mystery & Thriller (10 products)
            ['name' => 'Gone Girl', 'description' => 'Gillian Flynn\'s twisted psychological thriller about a marriage gone terribly wrong.', 'price' => 65.99, 'category' => 'Mystery & Thriller', 'rating' => 4.3, 'reviews' => 6543],
            ['name' => 'The Girl with the Dragon Tattoo', 'description' => 'Stieg Larsson\'s gripping Swedish crime thriller featuring hacker Lisbeth Salander.', 'price' => 69.99, 'category' => 'Mystery & Thriller', 'rating' => 4.4, 'reviews' => 4321],
            ['name' => 'In the Woods', 'description' => 'Tana French\'s atmospheric Irish mystery blending past trauma with present investigation.', 'price' => 61.99, 'category' => 'Mystery & Thriller', 'rating' => 4.2, 'reviews' => 2134],
            ['name' => 'The Silent Patient', 'description' => 'Alex Michaelides\'s psychological thriller about a woman who refuses to speak.', 'price' => 74.99, 'category' => 'Mystery & Thriller', 'rating' => 4.5, 'reviews' => 5432],
            ['name' => 'Big Little Lies', 'description' => 'Liane Moriarty\'s suburban mystery drama about secrets, lies, and domestic violence.', 'price' => 63.99, 'category' => 'Mystery & Thriller', 'rating' => 4.4, 'reviews' => 3456],
            ['name' => 'The Da Vinci Code', 'description' => 'Dan Brown\'s fast-paced religious conspiracy thriller featuring symbologist Robert Langdon.', 'price' => 68.99, 'category' => 'Mystery & Thriller', 'rating' => 4.1, 'reviews' => 7654],
            ['name' => 'And Then There Were None', 'description' => 'Agatha Christie\'s classic locked-room mystery featuring ten strangers on an island.', 'price' => 52.99, 'category' => 'Mystery & Thriller', 'rating' => 4.6, 'reviews' => 2876],
            ['name' => 'The Woman in the Window', 'description' => 'A.J. Finn\'s unreliable narrator thriller about an agoraphobic woman who witnesses a crime.', 'price' => 65.99, 'category' => 'Mystery & Thriller', 'rating' => 4.0, 'reviews' => 2654],
            ['name' => 'Sharp Objects', 'description' => 'Gillian Flynn\'s dark psychological mystery about a journalist returning to her hometown.', 'price' => 59.99, 'category' => 'Mystery & Thriller', 'rating' => 4.2, 'reviews' => 1987],
            ['name' => 'The Talented Mr. Ripley', 'description' => 'Patricia Highsmith\'s chilling psychological crime novel about identity and obsession.', 'price' => 56.99, 'category' => 'Mystery & Thriller', 'rating' => 4.3, 'reviews' => 1543],
        ];
    }
}
