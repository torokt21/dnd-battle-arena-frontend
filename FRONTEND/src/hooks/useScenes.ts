import { Scene } from "../types/Scene";
import useResource from "./useResource";

export default function useScenes() {
	return useResource<Scene[]>({ url: "/scenes" });
}
