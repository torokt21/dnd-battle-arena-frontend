import { Battle } from "../types/Battle";
import useResource from "./useResource";

export default function useBattles() {
	return useResource<Battle[]>({ url: "/battles" });
}
