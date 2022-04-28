USE [master]
GO

IF db_id('swapKeep') IS NULL
  CREATE DATABASE swapKeep
GO

USE [swapKeep]
GO

DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [ItemTradeOffer];
DROP TABLE IF EXISTS [Status];
DROP TABLE IF EXISTS [Category];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255),
  [Name] nvarchar(255),
  [UserName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255),
  [DesiredItems] nvarchar(255),
  [ZipCode] int NOT NULL
)
GO

CREATE TABLE [Item] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [CategoryId] int NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,
  [UserId] int NOT NULL,
  [Description] nvarchar(255),
  [Condition] int,
  [Available] bit NOT NULL
)
GO

CREATE TABLE [ItemTradeOffer] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Party1ItemId] int NOT NULL,
  [Party2ItemId] int,
  [StatusId] int NOT NULL
)
GO

CREATE TABLE [Status] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [ItemTradeOffer] ADD FOREIGN KEY ([Party1ItemId]) REFERENCES [Item] ([Id]) 
GO

ALTER TABLE [ItemTradeOffer] ADD FOREIGN KEY ([Party2ItemId]) REFERENCES [Item] ([Id]) ON DELETE SET NULL
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [ItemTradeOffer] ADD FOREIGN KEY ([StatusId]) REFERENCES [Status] ([Id])
GO
