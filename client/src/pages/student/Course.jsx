import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

function Course() {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl
     transform hover:scale-110 transition-all duration-300">
       <div className="relative">
        <img className='w-full h-36 object-cover rounded-t-lg' src="https://imgs.search.brave.com/4ksAKlQU1s6GrZaFE1pJk1nP_QSYPUP915QPOqzZ-vc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kM2Yx/aXlmeHh6OGkxZS5j/bG91ZGZyb250Lm5l/dC9jb3Vyc2VzL2Nv/dXJzZV9pbWFnZS81/NmRjODUwNDU1NTQu/anBn" alt="nextjs" />
        

        </div>
          <CardContent className="px-5 py-4 space-y-3">
            <h1 className='hover:underline font-bold to-lime-50 truncate'>
                NextJs15 Courses in 15hrs and crash courses
            </h1>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-3">
             <Avatar className='size-8'>
                <AvatarImage src="https://github.com/shadcn.png" alt='@shadcn' />
                    <AvatarFallback>Cn</AvatarFallback>
            
             </Avatar>
              <h1 className='text-sm font-medium'>Course Creator Name</h1>
              </div>
             <Badge className='bg-blue-900 text-wrap px-3 py-2 text-black'>
                Course Level
             </Badge>
            </div>
             <h1 className='text-2xl font-bold mt-2'> ₹ price</h1>
        </CardContent>
    
    </Card>
  )
}

export default Course