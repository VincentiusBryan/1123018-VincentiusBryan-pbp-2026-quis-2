'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comments', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            postId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Posts',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            userName: Sequelize.STRING,
            content: Sequelize.TEXT,
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Comments');
    }
};