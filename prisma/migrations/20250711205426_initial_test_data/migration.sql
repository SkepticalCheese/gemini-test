-- Add a tenant first so the user can be associated with it.
INSERT INTO "Tenant" ("name") VALUES ('Test Tenant');

-- Adds a user to the User table
INSERT INTO "User" ("auth0_id", "email", "name", "tenant_id")
    VALUES ('auth0|686f302df24ed5b3e3b95e78', 'wapabrgo@gmail.com', 'Wander Gomes', 1);

-- Adds a company to the Company table
INSERT INTO "Company" ("name", "tenant_id") VALUES ('Test Company', 1);

-- Adds contacts to the Contact table
INSERT INTO "Contact" ("name", "email", "phone", "company_id")
VALUES
    ('Contact One', 'contact.one@example.com', '123-456-7890', 1),
    ('Contact Two', 'contact.two@example.com', '098-765-4321', 1);
