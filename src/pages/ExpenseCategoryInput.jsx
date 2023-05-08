import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import {
  Fastfood as FastfoodIcon,
  DirectionsCar as DirectionsCarIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Favorite as FavoriteIcon,
  MusicNote as MusicNoteIcon,
  CardGiftcard as CardGiftcardIcon,
  LocalLibrary as LocalLibraryIcon,
  Tv as TvIcon,
  Flight as FlightIcon,
  Movie as MovieIcon,
  SportsEsports as SportsEsportsIcon,
  Phone as PhoneIcon,
  ChildFriendly as ChildFriendlyIcon,
  Pets as PetsIcon,
  Sports as SportsIcon,
  NaturePeople as NaturePeopleIcon,
  Pool as PoolIcon,
  LocalBar as LocalBarIcon,
  Cat as CatIcon,
  Casino as CasinoIcon,
  Laptop as LaptopIcon,
  Brush as BrushIcon,
  DirectionsCarOutlined as DirectionsCarOutlinedIcon,
  PhotoCamera as PhotoCameraIcon,
  SmokingRooms as SmokingRoomsIcon,
  LocalDrink as LocalDrinkIcon,
  Cake as CakeIcon,
  LocalCafe as LocalCafeIcon,
  EmojiFoodBeverage as EmojiFoodBeverageIcon,
  LocalFlorist as LocalFloristIcon,
  Spa as SpaIcon,
  LocalMall as LocalMallIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  LocalBrewery as LocalBreweryIcon,
  LocalWineBar as LocalWineBarIcon,
  EmojiNature as EmojiNatureIcon,
  Kitchen as KitchenIcon,
  LocalCarWash as LocalCarWashIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  AccountBalance as AccountBalanceIcon,
  Build as BuildIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalLaundryService as LocalLaundryServiceIcon,
  AttachMoney as AttachMoneyIcon,
  FormatListNumbered as FormatListNumberedIcon,
  ListAlt as ListAltIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const ExpenseCategoryInput = ({ onChange, value }) => {
  const classes = useStyles();

  const categories = [
    { name: "Alimentação", icon: <FastfoodIcon className={classes.icon} /> },
    {
      name: "Transporte",
      icon: <DirectionsCarIcon className={classes.icon} />,
    },
    {
      name: "Vestuário",
      icon: <ShoppingBasketIcon className={classes.icon} />,
    },
    { name: "Moradia", icon: <HomeIcon className={classes.icon} /> },
    { name: "Trabalho", icon: <WorkIcon className={classes.icon} /> },
    { name: "Educação", icon: <SchoolIcon className={classes.icon} /> },
    { name: "Saúde", icon: <FavoriteIcon className={classes.icon} /> },
    { name: "Lazer", icon: <MusicNoteIcon className={classes.icon} /> },
    { name: "Presentes", icon: <CardGiftcardIcon className={classes.icon} /> },
    { name: "Livros", icon: <LocalLibraryIcon className={classes.icon} /> },
    { name: "Eletrônicos", icon: <TvIcon className={classes.icon} /> },
    { name: "Viagens", icon: <FlightIcon className={classes.icon} /> },
    { name: "Cinema", icon: <MovieIcon className={classes.icon} /> },
    { name: "Jogos", icon: <SportsEsportsIcon className={classes.icon} /> },
    { name: "Telefone/Internet", icon: <PhoneIcon className={classes.icon} /> },
    { name: "Bebê", icon: <ChildFriendlyIcon className={classes.icon} /> },
    { name: "Animais", icon: <PetsIcon className={classes.icon} /> },
    { name: "Esportes", icon: <SportsIcon className={classes.icon} /> },
    {
      name: "Atividades ao ar livre",
      icon: <NaturePeopleIcon className={classes.icon} />,
    },
    { name: "Piscina", icon: <PoolIcon className={classes.icon} /> },
    { name: "Bebidas", icon: <LocalBarIcon className={classes.icon} /> },
    {
      name: "Jogos de Tabuleiro",
      icon: <CasinoIcon className={classes.icon} />,
    },
    { name: "Eletrônicos", icon: <LaptopIcon className={classes.icon} /> },
    {
      name: "Carros",
      icon: <DirectionsCarOutlinedIcon className={classes.icon} />,
    },
    { name: "Cosmesticos", icon: <BrushIcon className={classes.icon} /> },
    {
      name: "Instrumentos Musicais",
      icon: <MusicNoteIcon className={classes.icon} />,
    },
    { name: "Arte", icon: <ConfirmationNumberIcon className={classes.icon} /> },
    { name: "Decoração", icon: <LocalFloristIcon className={classes.icon} /> },
    { name: "Jardinagem", icon: <EmojiNatureIcon className={classes.icon} /> },
    { name: "Beleza", icon: <SpaIcon className={classes.icon} /> },
    { name: "Fotografia", icon: <PhotoCameraIcon className={classes.icon} /> },
    { name: "Tabacaria", icon: <SmokingRoomsIcon className={classes.icon} /> },
    { name: "Moda", icon: <ShoppingBasketIcon className={classes.icon} /> },
    { name: "Higiene pessoal", icon: <CakeIcon className={classes.icon} /> },
    {
      name: "Assinaturas",
      icon: <FormatListNumberedIcon className={classes.icon} />,
    },
    {
      name: "Padaria",
      icon: <EmojiFoodBeverageIcon className={classes.icon} />,
    },
    { name: "Sobremesas", icon: <LocalCafeIcon className={classes.icon} /> },
    { name: "Café", icon: <LocalDrinkIcon className={classes.icon} /> },
    { name: "Chá", icon: <KitchenIcon className={classes.icon} /> },
    {
      name: "Frutas",
      icon: <LocalGroceryStoreIcon className={classes.icon} />,
    },
    { name: "Ferramentas", icon: <BuildIcon className={classes.icon} /> },
    {
      name: "Supermercado",
      icon: <ShoppingCartIcon className={classes.icon} />,
    },
    {
      name: "Lavanderia",
      icon: <LocalLaundryServiceIcon className={classes.icon} />,
    },
    { name: "Contas", icon: <AccountBalanceIcon className={classes.icon} /> },
    {
      name: "Investimentos",
      icon: <AttachMoneyIcon className={classes.icon} />,
    },
    {
      name: "Lista de compras",
      icon: <ListAltIcon className={classes.icon} />,
    },
    {
      name: "Outros",
      icon: <FormatListNumberedIcon className={classes.icon} />,
    },
  ];

  return (
    <Form.Group controlId="expenseCategory">
      <Form.Label>Categoria</Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.icon}-{category.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default ExpenseCategoryInput;
