import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { errorMessage } from '../todoMessage/errorMessage';


export  class patchTODO{
  @IsNotEmpty({
    message: errorMessage.isEmptyMessage
    }

  )

  @MinLength(5,{
    message: errorMessage.MinLengthMessage
    }
  )
  @MaxLength(20, {
      message: errorMessage.MaxLengthMessage
    }
    )
  name: string;
  @IsNotEmpty(
    {
      message: errorMessage.isEmptyMessage
    }
  )
  @MaxLength(20, {
    message: errorMessage.MaxLengthMessage
    }
  )
  description: string;
  
}