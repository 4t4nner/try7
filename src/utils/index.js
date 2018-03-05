
export function hashCode(str) {
    let hash = 0;
    let i;
    for (i = 0; i < str.length; i++) {

        hash = ((hash<<5)-hash)+str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}