export const Logo = (props?: { className?: string, shopText?: boolean }) => {
  return (
    <div className={props?.className + ' font-bold text-xl text-main tracking-widest flex items-center'}>
      MPL {props?.shopText && ' Shop'}
    </div>
  )
}