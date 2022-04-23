import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";
import { Feature } from "./feature.entity";

@Index("uq_category_name", ["name"], { unique: true })
@Index("uq_category_image_path", ["imagePath"], { unique: true })
@Index("fk_category_parent__category_id", ["parentCategoryId"], {})
@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({
    type:"varchar",
    unique: true,
    length: 32
    
  })
  name: string;

  @Column({
    type:"varchar",
    name: "image_path",
    unique: true,
    length: 255
    
  })
  imagePath: string;

  @Column({
    type:"int", 
    name: "parent__category_id",
    nullable: true,
    unsigned: true,
  })
  parentCategoryId: number | null;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];

  @OneToMany(() => Feature, (feature) => feature.category)
  features: Feature[];
}
