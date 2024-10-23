import { Entity } from "../types/Entity";
import useResource from "./useResource";

export default function useEntities() {
	return useResource<Entity[]>({ url: "/entities" });
}
