import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: 'engine', name: 'Двигатель', icon: 'Cog' },
  { id: 'suspension', name: 'Подвеска', icon: 'Settings' },
  { id: 'electrical', name: 'Электрика', icon: 'Zap' },
];

const products = [
  {
    id: 1,
    category: 'engine',
    name: 'Масляный фильтр MANN W 712/73',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/oil-filter.jpg',
    description: 'Высококачественный масляный фильтр для европейских автомобилей',
    inStock: true,
  },
  {
    id: 2,
    category: 'engine',
    name: 'Воздушный фильтр BOSCH F 026 400 201',
    price: 1250,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/air-filter.jpg',
    description: 'Оригинальный воздушный фильтр с высокой степенью очистки',
    inStock: true,
  },
  {
    id: 3,
    category: 'engine',
    name: 'Свечи зажигания NGK BKR6E',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/spark-plugs.jpg',
    description: 'Надежные свечи зажигания для бензиновых двигателей',
    inStock: true,
  },
  {
    id: 4,
    category: 'engine',
    name: 'Ремень ГРМ Gates 5491XS',
    price: 2890,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/timing-belt.jpg',
    description: 'Усиленный ремень газораспределительного механизма',
    inStock: false,
  },
  {
    id: 5,
    category: 'engine',
    name: 'Термостат Wahler 4256.87D',
    price: 1690,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/thermostat.jpg',
    description: 'Точный термостат системы охлаждения',
    inStock: true,
  },
  {
    id: 6,
    category: 'suspension',
    name: 'Амортизатор передний SACHS 310 837',
    price: 4590,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/shock-absorber.jpg',
    description: 'Газомасляный амортизатор премиум класса',
    inStock: true,
  },
  {
    id: 7,
    category: 'suspension',
    name: 'Пружина подвески Lesjöfors 4263401',
    price: 2350,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/suspension-spring.jpg',
    description: 'Усиленная пружина передней подвески',
    inStock: true,
  },
  {
    id: 8,
    category: 'suspension',
    name: 'Опора стойки LEMFÖRDER 31329 01',
    price: 1890,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/strut-mount.jpg',
    description: 'Резинометаллическая опора амортизатора',
    inStock: true,
  },
  {
    id: 9,
    category: 'suspension',
    name: 'Рычаг подвески TRW JTC1222',
    price: 5890,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/control-arm.jpg',
    description: 'Нижний рычаг передней подвески с шаровой',
    inStock: false,
  },
  {
    id: 10,
    category: 'suspension',
    name: 'Стабилизатор поперечной устойчивости SWAG 30 93 9697',
    price: 3450,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/stabilizer.jpg',
    description: 'Передний стабилизатор с втулками',
    inStock: true,
  },
  {
    id: 11,
    category: 'electrical',
    name: 'Аккумулятор VARTA Blue Dynamic 60Ah',
    price: 7890,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/battery.jpg',
    description: 'Надежный аккумулятор емкостью 60Ah, 540A',
    inStock: true,
  },
  {
    id: 12,
    category: 'electrical',
    name: 'Генератор BOSCH 0 986 081 240',
    price: 12890,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/alternator.jpg',
    description: 'Восстановленный генератор 90A',
    inStock: true,
  },
  {
    id: 13,
    category: 'electrical',
    name: 'Стартер VALEO 458218',
    price: 9890,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/starter.jpg',
    description: 'Стартер 1.1 кВт для дизельных двигателей',
    inStock: false,
  },
  {
    id: 14,
    category: 'electrical',
    name: 'Датчик ABS HELLA 6PU 010 039-311',
    price: 1590,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/abs-sensor.jpg',
    description: 'Передний датчик антиблокировочной системы',
    inStock: true,
  },
  {
    id: 15,
    category: 'electrical',
    name: 'Лампы H7 OSRAM Night Breaker',
    price: 1290,
    image: 'https://cdn.poehali.dev/projects/b876f6ca-1000-483c-97e6-11c5f26b7a51/bucket/headlight-bulbs.jpg',
    description: 'Галогенные лампы повышенной яркости',
    inStock: true,
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Спасибо за обращение!',
      description: 'Мы свяжемся с вами в ближайшее время.',
    });
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" size={32} />
              <h1 className="text-2xl font-bold">АвтоЗапчасти</h1>
            </div>
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('home')} className="hover:text-accent transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('catalog')} className="hover:text-accent transition-colors">
                Каталог
              </button>
              <button onClick={() => scrollToSection('delivery')} className="hover:text-accent transition-colors">
                Доставка
              </button>
              <button onClick={() => scrollToSection('payment')} className="hover:text-accent transition-colors">
                Оплата
              </button>
              <button onClick={() => scrollToSection('help')} className="hover:text-accent transition-colors">
                Справка
              </button>
              <button onClick={() => scrollToSection('contacts')} className="hover:text-accent transition-colors">
                Контакты
              </button>
            </div>
            <Button variant="outline" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Icon name="ShoppingCart" size={20} />
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl animate-fade-in">
              <h2 className="text-5xl font-bold mb-6">Качественные запчасти для вашего автомобиля</h2>
              <p className="text-xl mb-8 opacity-90">
                Широкий ассортимент оригинальных и аналоговых запчастей. Быстрая доставка по всей России.
              </p>
              <Button size="lg" onClick={() => scrollToSection('catalog')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Перейти в каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover-scale">
                <CardHeader>
                  <Icon name="Truck" size={48} className="text-accent mb-4" />
                  <CardTitle>Быстрая доставка</CardTitle>
                  <CardDescription>Доставим заказ в течение 1-3 дней</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <Icon name="Shield" size={48} className="text-accent mb-4" />
                  <CardTitle>Гарантия качества</CardTitle>
                  <CardDescription>Все товары сертифицированы</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <Icon name="Headphones" size={48} className="text-accent mb-4" />
                  <CardTitle>Поддержка 24/7</CardTitle>
                  <CardDescription>Всегда готовы помочь с выбором</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Каталог товаров</h2>
            
            <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setSelectedCategory(v)}>
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
                <TabsTrigger value="all">Все товары</TabsTrigger>
                {categories.map(cat => (
                  <TabsTrigger key={cat.id} value={cat.id}>
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover-scale animate-scale-in overflow-hidden">
                    <div className="aspect-square bg-muted overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-accent">{product.price} ₽</span>
                        {product.inStock ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">В наличии</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600 border-red-600">Под заказ</Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-accent hover:bg-accent/90">
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Tabs>
          </div>
        </section>

        <section id="delivery" className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Способы доставки</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Icon name="Store" size={32} className="text-accent mb-2" />
                  <CardTitle>Самовывоз</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Бесплатно. Заказ готов через 2 часа после оформления.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Truck" size={32} className="text-accent mb-2" />
                  <CardTitle>Курьерская доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>По Москве - 300₽. Доставка на следующий день.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Package" size={32} className="text-accent mb-2" />
                  <CardTitle>CDEK</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>По России от 350₽. Срок доставки 2-5 дней.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Mail" size={32} className="text-accent mb-2" />
                  <CardTitle>Почта России</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>По России от 250₽. Срок доставки 5-14 дней.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="payment" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Способы оплаты</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Icon name="CreditCard" size={48} className="text-accent mx-auto mb-2" />
                  <CardTitle>Банковская карта</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Visa, MasterCard, МИР</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Icon name="Wallet" size={48} className="text-accent mx-auto mb-2" />
                  <CardTitle>Наличные</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>При получении заказа</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Icon name="Smartphone" size={48} className="text-accent mx-auto mb-2" />
                  <CardTitle>Электронные деньги</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>ЮMoney, QIWI, WebMoney</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="help" className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Справка</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Как оформить заказ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Выберите нужные товары в каталоге, добавьте их в корзину и оформите заказ. Мы свяжемся с вами для подтверждения.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Как узнать артикул запчасти?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Артикул указан в документах на автомобиль или в руководстве по эксплуатации. Также можете позвонить нам - поможем подобрать.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Есть ли гарантия на товары?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Да, на все товары распространяется гарантия производителя от 6 месяцев до 2 лет в зависимости от категории.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Можно ли вернуть товар?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Товар надлежащего качества можно вернуть в течение 14 дней с момента покупки при сохранении товарного вида.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Контакты и обратная связь</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Наши контакты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={24} className="text-accent" />
                      <div>
                        <p className="font-semibold">Телефон</p>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={24} className="text-accent" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">info@avtozapchasti.ru</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={24} className="text-accent" />
                      <div>
                        <p className="font-semibold">Адрес</p>
                        <p className="text-muted-foreground">г. Москва, ул. Автомобильная, д. 15</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={24} className="text-accent" />
                      <div>
                        <p className="font-semibold">Режим работы</p>
                        <p className="text-muted-foreground">Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Форма обратной связи</CardTitle>
                  <CardDescription>Напишите нам, и мы ответим в ближайшее время</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input placeholder="Ваше имя" required />
                    </div>
                    <div>
                      <Input type="email" placeholder="Email" required />
                    </div>
                    <div>
                      <Input type="tel" placeholder="Телефон" required />
                    </div>
                    <div>
                      <Textarea placeholder="Ваше сообщение" rows={4} required />
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                      Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2024 АвтоЗапчасти. Все права защищены.</p>
          <div className="flex justify-center gap-6">
            <button className="hover:text-accent transition-colors">О компании</button>
            <button className="hover:text-accent transition-colors">Политика конфиденциальности</button>
            <button className="hover:text-accent transition-colors">Условия использования</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
