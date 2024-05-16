CREATE TABLE `instruments` (
	`id` text(22) PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`description` text(2000) NOT NULL,
	`price` real NOT NULL,
	`image_url` text(1000) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `instruments` (`name`);