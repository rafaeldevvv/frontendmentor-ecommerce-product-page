export default function Profile({ src, alt, profileLink }) {
   return (
     <div>
       <a
         href={profileLink}
         target="_blank"
         className="focus block rounded-full outline outline-0 outline-offset-0 outline-orange hover:outline-2 focus-visible:outline-2"
       >
         <img
           src={src}
           alt={alt}
           className="aspect-square w-[clamp(1.6rem,6vw,3rem)] min-w-4"
         />
         <span className="sr-only">Profile</span>
       </a>
     </div>
   );
 }