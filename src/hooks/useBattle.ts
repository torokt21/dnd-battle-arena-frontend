import { Battle } from "../types/Battle";
import useResource from "./useResource";

export default function useBattle(id: number) {
	return useResource<Battle>({ url: "/battles/" + id });
}
