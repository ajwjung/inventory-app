# Inventory Application

- Live demo

## Objective

To practice creating a CRUD inventory app that has both categories and items. The user should be able to choose a category to view and get a list of every item in that category. Full details can be found on [The Odin Project's page](https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application).

## Built With

- [React](https://react.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Features

This app allows users to create, read, update, and delete drinks (items) and drink types (categories). There are existing data already inserted as samples that cannot be deleted for the sake of having a starting point. For all drinks, the milk substitute cannot be edited because of how data is stored.

## Known Issues

When a new drink is added to a new category, its card will take up lots of vertical space and overlap other cards. Once a second card is added to the category, the cards will balance out again. This only applies to the very last category on the page and only when there is just a single card in that category.
