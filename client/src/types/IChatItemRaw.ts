

export default interface IChatItemRaw {

  etag: string;
  authorDetails: {
      displayName: string;
      profileImageUrl: string;
  };
  snippet: {
      publishedAt: string;
      textMessageDetails: {
          messageText: string;
      };
  };

}//END IChatItem
