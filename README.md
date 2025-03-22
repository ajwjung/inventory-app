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

This app allows users to create, read, update, and delete drinks (items) and drink types (categories). Sample data has already been inserted and cannot be deleted by the user so that there are examples to preview at any given time. For all default drinks, the milk substitute property cannot be edited because most drinks have multiple records for the same drink with a different milk option.

## Known Issues

When a new drink is added to a new category, its card will take up lots of vertical space and overlap other cards. Once a second card is added to the category, the cards will balance out again. This only applies to the very last category on the page and only when there is just a single card in that category.
