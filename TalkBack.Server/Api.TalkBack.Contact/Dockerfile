#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Api.TalkBack.Contact/Api.TalkBack.Contact.csproj", "Api.TalkBack.Contact/"]
RUN dotnet restore "Api.TalkBack.Contact/Api.TalkBack.Contact.csproj"
COPY . .
WORKDIR "/src/Api.TalkBack.Contact"
RUN dotnet build "Api.TalkBack.Contact.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Api.TalkBack.Contact.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.TalkBack.Contact.dll"]