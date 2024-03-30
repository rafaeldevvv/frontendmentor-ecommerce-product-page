export default function getThumbnailSrc(src) {
   return src.replace(/(\.\w+)$/, "-thumbnail$1");
}